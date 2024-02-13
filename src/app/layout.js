import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { noto_serif_display, poppins } from "@/lib/fonts";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import { AsideNav } from "./common/asideNav";
import { TopNav } from "./common/topNav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TimeTrove",
  description: "E-commerce website",
};

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
        <main className="w-full h-[100vh] min-h-[750px] flex">
          <AsideNav />
          <div className="w-[85%]">
            <TopNav />
            {children}
          </div>
        </main>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
