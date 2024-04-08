import Script from "next/script";
import { AsideNav } from "../common/asidenav/asideNav";
import { TopNav } from "../common/topnav/topNav";

export default function ShopLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <div className="relative z-[100]">
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </div>
      <main className="w-full h-[100vh] sm:min-h-[700px] flex">
        <div className="w-fit hidden lg:flex">
          <AsideNav />
        </div>
        <main className="w-[100%] lg:w-[85%] border-l-2 scroll h-screen">
          <TopNav />
          {children}
        </main>
      </main>
    </section>
  );
}
