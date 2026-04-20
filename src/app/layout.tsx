import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generateMetadataBase } from "@/lib/seo";
import { BUSINESS_NAME } from "@/constants/contacts";
import "./globals.css";
import "@/styles/tokens.css";

export const metadata: Metadata = {
  ...generateMetadataBase(),
  title: {
    template: `%s | ${BUSINESS_NAME}`,
    default: `${BUSINESS_NAME} — Coastal Experiences, Mombasa`,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-950 text-white overflow-x-clip">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
