import AsideNav from "../common/asideNav";
import TopNav from "../common/topNav";

// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div>
      <TopNav />
      <AsideNav />
    </div>
  );
}
