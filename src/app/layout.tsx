import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lokesh mvs",
  description:
    "👋 My personal portfolio website where I share my projects, blogs & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
