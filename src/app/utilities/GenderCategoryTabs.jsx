"use client";
import { Button } from "@/components/ui/button";
import { MdBoy, MdGirl } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useState } from "react";
import { Label } from "@/components/ui/label";
export const GenderCategoryTabs = ({
  section,
  allData,
  menData,
  womenData,
}) => {
  const [tabValue, setTabValue] = useState("all");

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex w-full gap-2 justify-between border-b-2 h-20 rounded-none px-5">
        <h1 className="font-semibold text-3xl">{section}</h1>
        <div className="flex md:hidden items-center gap-2">
          <TabsTrigger
            onClick={() => setTabValue("all")}
            value="all"
            className={`${
              tabValue == "all"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-5`}
          >
            <Layers size={15} />
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTabValue("men")}
            value="men"
            className={`${
              tabValue == "men"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-4`}
          >
            <MdBoy size={25} />
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTabValue("women")}
            value="women"
            className={`${
              tabValue == "women"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-3`}
          >
            <MdGirl size={25} />
          </TabsTrigger>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <TabsTrigger
            onClick={() => setTabValue("all")}
            value="all"
            className={`${
              tabValue == "all"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-5`}
          >
            <Layers size={15} />
            &nbsp;All&nbsp;
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTabValue("men")}
            value="men"
            className={`${
              tabValue == "men"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-4`}
          >
            <MdBoy size={25} />
            Men
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTabValue("women")}
            value="women"
            className={`${
              tabValue == "women"
                ? "bg-purple text-white"
                : "bg-grey hover:bg-grey.200"
            }  transition-colors h-10 rounded-2xl px-3`}
          >
            <MdGirl size={25} />
            Women&nbsp;
          </TabsTrigger>
        </div>
        <PopOverFilter />
      </TabsList>
      <TabsContent
        value="all"
        className="w-full px-5 pt-2 flex gap-2 flex-wrap justify-center lg:justify-normal items-center "
      >
        {allData}
      </TabsContent>
      <TabsContent
        value="men"
        className="w-full pt-0 px-5 flex gap-2 flex-wrap items-center"
      >
        {menData}
      </TabsContent>
      <TabsContent
        value="women"
        className="w-full px-5 pt-0 flex gap-2 flex-wrap items-center"
      >
        {womenData}
      </TabsContent>
    </Tabs>
  );
};

const PopOverFilter = () => {
  const [price, setPrice] = useState(500);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
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
          <div className="flex gap-3 items-center">
            <Label htmlFor="price">Price</Label>
            <p className="font-semibold">
              {`${price[0] ?? 500}  - ${price[1] ?? 2000}`}
            </p>
          </div>
          <Slider
            id="price"
            onValueChange={(e) => {
              setPrice(e);
            }}
            color="#f2f2f2"
            defaultValue={[500, 2000]}
            max={10000}
            step={100}
          />

          <RadioGroup
            id="size"
            defaultValue="1"
            className="flex gap-2 flex-wrap items-center pt-8 relative"
          >
            <Label htmlFor="size" className="absolute top-2">
              Size
            </Label>
            <div className="flex items-center space-x-2 bg-grey px-2 py-2 rounded-lg cursor-pointer">
              <RadioGroupItem value="XS" id="1" className="bg-white" />
              <Label htmlFor="1">XS</Label>
            </div>
            <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
              <RadioGroupItem value="S" id="2" className="bg-white" />
              <Label htmlFor="2">S</Label>
            </div>
            <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
              <RadioGroupItem value="M" id="3" className="bg-white" />
              <Label htmlFor="3">M</Label>
            </div>
            <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
              <RadioGroupItem value="L" id="4" className="bg-white" />
              <Label htmlFor="4">L</Label>
            </div>
            <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
              <RadioGroupItem value="XL" id="5" className="bg-white" />
              <Label htmlFor="5">Xl</Label>
            </div>
          </RadioGroup>
          <DropDown name="Color" value="s" />
          <DropDown name="Brand" value="s" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DropDown = ({ name, value, data }) => {
  return (
    <Select>
      <Label className="mt-5">{name}</Label>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select your ${name}`} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>{name}</SelectLabel>
          <SelectItem className="uppercase" value={value}>
            {value}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
