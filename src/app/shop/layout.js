import { AsideNav } from "../common/asideNav";
import { TopNav } from "../common/topNav";

export default function ShopLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <main className="w-full h-[100vh] min-h-[750px] flex">
        <AsideNav />
        <div className="w-[85%]">
          <TopNav />
          {children}
        </div>
      </main>
    </section>
  );
}
