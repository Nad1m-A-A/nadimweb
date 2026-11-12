import "./globals.css";
import ScrollToTop from "@/components/shared/ui/scroll-to-top";
import { sansFont, serifFont } from "@/lib/fonts";
import { siteMetadata } from "@/data/metadata";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.className} ${sansFont.variable} ${serifFont.variable} h-full font-light antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
