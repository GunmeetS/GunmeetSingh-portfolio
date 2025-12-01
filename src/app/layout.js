import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { themeScript } from "./theme-script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(
    `${process.env.NEXT_PUBLIC_SITE_URL}`
  ),
  title: {
    default: `${process.env.NEXT_PUBLIC_YOUR_NAME} - Full Stack Web Developer`,
    template: `%s | ${process.env.NEXT_PUBLIC_YOUR_NAME}`,
  },
  description:
    "Full Stack Web Developer with 1+ years of experience in Next.js, React, TypeScript, Node.js, and modern web technologies.",
  keywords: [
    `${process.env.NEXT_PUBLIC_YOUR_NAME}`,
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
  ],
  authors: [{ name: `${process.env.NEXT_PUBLIC_YOUR_NAME}` }],
  creator: `${process.env.NEXT_PUBLIC_YOUR_NAME}`,

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    title: `${process.env.NEXT_PUBLIC_YOUR_NAME} - Full Stack Web Developer`,
    description: "Full Stack Web Developer with 1+ years of experience",
    siteName: `${process.env.NEXT_PUBLIC_YOUR_NAME} Portfolio`,
  },

  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_YOUR_NAME} - Full Stack Web Developer`,
    description:
      "Full Stack Web Developer specializing in Next.js and modern web technologies",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14b8a6" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />

        {/* Web Vitals Performance Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (window.gtag) {
                      window.gtag('event', entry.name, {
                        value: Math.round(entry.name === 'CLS' ? entry.value * 1000 : entry.value),
                        event_category: 'Web Vitals',
                        event_label: entry.id,
                        non_interaction: true,
                      })
                    }
                  }
                })
                observer.observe({ 
                  entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
                })
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
