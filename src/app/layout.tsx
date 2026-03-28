import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clemta Tax Calculator",
  description: "Estimate your US tax obligations based on your country's tax treaty with the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
