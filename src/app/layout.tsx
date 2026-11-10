import type { Metadata } from "next";
import "./globals.css";
import { appFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Nadim Alaa, Fullstack Web Developer",
    template: "%s | Nadim Alaa",
  },
  description:
    "Nadim Alaa, Fullstack Web Developer Specialized in Enterprise Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${appFont.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
