import type { Metadata } from "next";
import "./globals.css";
import { sansFont, serifFont } from "@/lib/fonts";
export const metadata: Metadata = {
  title: {
    default: "Nadim Web | Product Engineer",
    template: "%s | Nadim Web",
  },
  description:
    "Nadim Web, Product Engineer Specialized in Enterprise Systems & Modern Websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.className} ${sansFont.variable} ${serifFont.variable} h-full font-light antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
