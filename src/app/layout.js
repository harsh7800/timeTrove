"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { noto_serif_display, poppins } from "@/lib/fonts";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700&family=Marcellus+SC&family=Noto+Serif+Display:wght@400;500&family=Oswald:wght@600&family=Poppins:ital,wght@1,300&family=Roboto:wght@400;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body className={`${poppins} ${noto_serif_display}`}>
        <ProgressBar
          height="4px"
          color="#b800e6"
          options={{ showSpinner: true }}
          delay={600}
          shallowRouting
        />
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
