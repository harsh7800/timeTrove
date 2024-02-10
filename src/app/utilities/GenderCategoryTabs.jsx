import { Button } from "@/components/ui/button";
import { MdBoy, MdGirl } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, ShoppingCart, SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const GenderCategoryTabs = ({
  section,
  allData,
  menData,
  womenData,
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex w-full gap-2 justify-between border-b-2 h-20 rounded-none px-5">
        <h1 className="font-semibold text-3xl">{section}</h1>
        <div className="flex items-center gap-2">
          <TabsTrigger
            value="all"
            className="bg-grey hover:bg-grey.200 transition-colors h-10 rounded-2xl px-5"
          >
            <Layers size={15} />
            &nbsp;All&nbsp;
          </TabsTrigger>
          <TabsTrigger
            value="men"
            className="bg-grey hover:bg-grey.200 transition-colors h-10 rounded-2xl px-4"
          >
            <MdBoy size={25} />
            Men
          </TabsTrigger>
          <TabsTrigger
            value="women"
            className="bg-grey hover:bg-grey.200 transition-colors h-10 rounded-2xl px-3"
          >
            <MdGirl size={25} />
            &nbsp;Women&nbsp;
          </TabsTrigger>
        </div>
        <PopoverFilter />
      </TabsList>
      <TabsContent value="all" className="w-full">
        {allData}
      </TabsContent>
      <TabsContent value="men" className="w-full">
        {menData}
      </TabsContent>
      <TabsContent value="women" className="w-full">
        {womenData}
      </TabsContent>
    </Tabs>
  );
};

const PopoverFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-grey text-lg rounded-xl hover:bg-grey.200 text-black">
          <SlidersHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Filter</h4>
          <DropDown name="Size" value="s" />
          <DropDown name="color" value="s" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DropDown = ({ name, value, data }) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-white">
          <SelectLabel>{name}</SelectLabel>
          <SelectItem className="uppercase" value={value}>
            {value}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
