import { AsideNav } from "../common/asidenav/asideNav";
import { TopNav } from "../common/topnav/topNav";

export default function ShopLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <main className="w-full h-[100vh] min-h-[650px] flex">
        <div className="w-fit hidden lg:flex">
          <AsideNav />
        </div>
        <main className="w-[100%] lg:w-[85%]">
          <TopNav />
          {children}
        </main>
      </main>
    </section>
  );
}
