import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/components/providers/ReactQuery";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cherry Affiliate",
  description: "A platform for Cherry's affiliate marketing",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "fr" }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <ReactQueryClientProvider>
      <html lang={locale} suppressHydrationWarning className="dark">
        <body
          className={`${poppins.className} bg-background w-full min-h-full h-full mx-auto scroll-smooth overflow-x-hidden antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
