import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/components/QueryProvider";
import AuthWrapper from "@/components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TOPTOP",
    default: "TOPTOP - Make Your Day",
  },
  description: "A TikTok clone application",
};

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        <QueryProvider>
          <StoreProvider>
            <AuthWrapper>
            {children}
            </AuthWrapper>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
