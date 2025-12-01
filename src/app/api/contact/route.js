import { NextResponse } from "next/server";
import { after } from 'next/server'
import { prisma } from "@/lib/prisma";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendConfirmationEmail } from "@/lib/email";

const getClientIP = (request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfIP = request.headers.get("cf-connecting-ip");
  const vercelIP = request.headers.get("x-vercel-forwarded-for");

  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    return ips[0];
  }

  if (realIP) return realIP;
  if (cfIP) return cfIP;
  if (vercelIP) return vercelIP;

  return "localhost";
};

export async function POST(request) {
  let contact = null;

  try {
    const body = await request.json();
    const { name, email, company, position, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (message.length < 3 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 3 and 5000 characters' },
        { status: 400 }
      )
    }

    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    const isLocalhost = ["localhost", "::1", "127.0.0.1"].includes(ipAddress);

    // Rate Limiting
    try {
      // Email-based (always check)
      const recentContactByEmail = await prisma.contact.findFirst({
        where: {
          email: email.toLowerCase(),
          createdAt: {
            gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes
          },
        },
      });

      if (recentContactByEmail) {
        return NextResponse.json(
          {
            error:
              "You already submitted a message recently. Please wait a few minutes.",
            retryAfter: 300,
          },
          { status: 429 }
        );
      }

      // IP-based (skip for localhost)
      if (!isLocalhost) {
        const recentContactByIP = await prisma.contact.findFirst({
          where: {
            ipAddress: ipAddress,
            createdAt: {
              gte: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes
            },
          },
        });

        if (recentContactByIP) {
          return NextResponse.json(
            {
              error: "Too many requests. Please try again in 2 minutes.",
              retryAfter: 120,
            },
            { status: 429 }
          );
        }
      }

      // Daily limit
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayContactCount = await prisma.contact.count({
        where: {
          email: email.toLowerCase(),
          createdAt: { gte: todayStart },
        },
      });

      if (todayContactCount >= 3) {
        return NextResponse.json(
          {
            error:
              "Daily limit reached (3 messages per day). Please try again tomorrow.",
          },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    // Save to database
    try {
      contact = await prisma.contact.create({
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          company: company?.trim() || null,
          position: position?.trim() || null,
          message: message.trim(),
          ipAddress,
          userAgent,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    // Send notifications in background
    after(async () => {
      // Telegram
      try {
        const telegramMessage = `
🔔 <b>New Contact Form Message!</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
${company ? `🏢 <b>Company:</b> ${company}\n` : ""}${
          position ? `💼 <b>Position:</b> ${position}\n` : ""
        }
📝 <b>Message:</b>
${message}

⏰ <b>Time:</b> ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
🌐 <b>IP:</b> ${ipAddress}${isLocalhost ? " (localhost)" : ""}
🆔 <b>ID:</b> ${contact.id}
        `.trim();

        await sendTelegramNotification(telegramMessage);
      } catch (error) {
        console.error("Telegram failed:", error.message);
      }

      // Email
      try {
        await sendConfirmationEmail({
          name,
          email,
          message,
          company,
          position,
        });
      } catch (error) {
        console.error("Email failed:", error.message);
      }
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! I will get back to you soon.",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("Unexpected error:", error);

    if (contact?.id) {
      return NextResponse.json({
        success: true,
        message: "Your message was saved successfully.",
        contactId: contact.id,
      });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
