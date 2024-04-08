import { Menu } from "lucide-react";
import { AsideNav } from "../common/asidenav/asideNav";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DrawerClose } from "@/components/ui/drawer";

export const SideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white w-[300px] h-[100vh] min-h-[750px]"
      >
        <AsideNav mobile={true} />
      </SheetContent>
    </Sheet>
  );
};
