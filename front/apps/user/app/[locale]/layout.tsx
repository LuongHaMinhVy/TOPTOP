import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <StoreProvider>
              <AuthWrapper>
                {children}
              </AuthWrapper>
            </StoreProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

