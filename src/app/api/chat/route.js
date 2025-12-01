import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "@/config/ai-prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7, // Balanced creativity (not too random, not too robotic and not same answer every time)
        maxOutputTokens: 500, // Medium-length responses (~375 words max)
        topP: 0.8, // Natural word variety (80% probability mass) Natural conversation 
        topK: 40, // Consider top 40 word choices (balanced)
      },
    });

    // Build conversation history from messages
    const conversationHistory = messages
      .slice(0, -1) // Exclude last message (we'll add it separately)
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n");

    // Get the latest user message
    const latestUserMessage = messages[messages.length - 1].content;

    // Combine everything into one prompt
    const fullPrompt = `${systemPrompt}

${
  conversationHistory ? `CONVERSATION HISTORY:\n${conversationHistory}\n\n` : ""
}User: ${latestUserMessage}
Assistant:`;

    // Generate response from Gemini
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Return the AI response
    return new Response(JSON.stringify({ content: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return new Response(
      JSON.stringify({
        content:
          `Sorry, I encountered an error. Please try again or contact ${process.env.NEXT_PUBLIC_YOUR_NAME} directly at ${process.env.NEXT_PUBLIC_YOUR_EMAIL}.`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
