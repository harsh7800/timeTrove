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
export const DropDownMenu = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-[#f2f2f2] hover:bg-grey.200 text-black font-bold cursor-pointer select-none transition-colors">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="uppercase">
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-grey transition-all"
          onClick={() => router.push("/shop/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-grey transition-all">
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-grey transition-all">
          Order Status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
