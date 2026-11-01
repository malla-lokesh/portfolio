import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lokeshmvs.dev"),
  title: {
    default: "lokesh mvs",
    template: "%s · lokesh mvs",
  },
  description:
    "Frontend developer. Learning design, writing, and sharing what I like.",
  applicationName: "lokesh mvs",
  authors: [{ name: "lokesh mvs", url: "https://lokeshmvs.dev" }],
  creator: "lokesh mvs",
  keywords: ["lokesh mvs", "frontend developer", "design", "portfolio"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lokeshmvs.dev",
    siteName: "lokesh mvs",
    title: "lokesh mvs",
    description:
      "Frontend developer. Learning design, writing, and sharing what I like.",
  },
  twitter: {
    card: "summary_large_image",
    title: "lokesh mvs",
    description:
      "Frontend developer. Learning design, writing, and sharing what I like.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
