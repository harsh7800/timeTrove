import { AsideNav } from "../common/asideNav";
import { TopNav } from "../common/topNav";

export default function ShopLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <main className="w-full h-[100vh] min-h-[750px] flex">
        <div className="w-fit hidden lg:flex">
          <AsideNav />
        </div>
        <div className="w-[100%] lg:w-[85%]">
          <TopNav />
          {children}
        </div>
      </main>
    </section>
  );
}
