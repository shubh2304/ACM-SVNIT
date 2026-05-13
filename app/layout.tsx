import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SVNIT ACM Student Chapter — Where Engineers Become Innovators",
    template: "%s | SVNIT ACM",
  },
  description:
    "SVNIT's premier computing society powered by ACM. Join us for hackathons, workshops, talks, and more. Build, learn, and grow with the best tech community at SVNIT Surat.",
  keywords: [
    "SVNIT ACM",
    "ACM Student Chapter",
    "SVNIT Surat",
    "Tech Club",
    "Hackathon",
    "Programming",
    "AI ML",
    "Web Development",
    "Cybersecurity",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://svnitacm.in",
    siteName: "SVNIT ACM Student Chapter",
    title: "SVNIT ACM Student Chapter",
    description: "SVNIT's premier computing society powered by ACM.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVNIT ACM Student Chapter",
    description: "SVNIT's premier computing society powered by ACM.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-text-primary font-dm antialiased">
        {children}
      </body>
    </html>
  );
}
