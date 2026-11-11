import type { Metadata } from "next";
import "./globals.css";
import { sansFont, serifFont } from "@/lib/fonts";
import { NavTextureSwitcher } from "@/components/ui/nav-texture-switcher";

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
    <html lang="en" className={`${sansFont.className} ${sansFont.variable} ${serifFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <NavTextureSwitcher />
      </body>
    </html>
  );
}
