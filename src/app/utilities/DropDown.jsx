import { useRouter } from "next-nprogress-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useStore } from "../store/zustandStore";
export const DropDownMenu = () => {
  const router = useRouter();
  const email = useStore((state) => state.user.email);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-[#f2f2f2] hover:bg-grey.200 border-2 text-black font-bold cursor-pointer select-none transition-colors">
          <AvatarImage
            src="https://lh3.googleusercontent.com/a/ACg8ocIwXKjuDN7gFtM-0wIETQDRJz42gOyp3B350wCepEW7yw=s96-c"
            alt="@shadcn"
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel className="font-bold text-[#808080]">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-grey transition-all"
          onClick={() => router.push("/shop/account/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-grey transition-all"
          onClick={() => router.push(`/shop/account/billing/${email}`)}
        >
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-grey transition-all"
          onClick={() => router.push(`/shop/account/orders`)}
        >
          Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
