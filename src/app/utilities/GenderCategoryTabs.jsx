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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import ProductCard from "./productCard";
import { filter, useCart, wishlist } from "../store/zustandStore";
import {
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
} from "../helpers/functions";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next-nprogress-bar";
import {
  FetchAllCategory,
  FetchAllColors,
  FetchAllSubCategory,
} from "../helpers/action";
export const GenderCategoryTabs = ({
  section,
  allData,
  menData,
  womenData,
}) => {
  const [tabValue, setTabValue] = useState("all");

  //------------useCart-store------
  const cart = useCart((state) => state.cart);
  const updateSubTotal = useCart((state) => state.updateSubTotal);

  //------------wishlist-store------
  const wishlistCart = wishlist((state) => state.wishlistCart);
  const wishlistSubTotal = wishlist((state) => state.wishlistSubTotal);

  //------------filter-store------
  const filterData = filter(useShallow((state) => state.filterData));

  const filterProductData = (data, filterData) => {
    const { budget, size, color, category, subCategory } = filterData;

    const isPriceInRange = data.price >= budget[0] && data.price <= budget[1];
    const isSizeMatch = size === "" || data.size.includes(size);

    const isColorMatch = color === "" || data.color.includes(color);
    const isCategoryMatch = category === "" || data.category === category;
    const isSubCategoryMatch =
      subCategory === "" || data.subCategory === subCategory;

    return (
      isPriceInRange &&
      isSubCategoryMatch &&
      isCategoryMatch &&
      isSizeMatch &&
      isColorMatch
    );
  };
  return (
    <Tabs defaultValue="all" className="w-full scroll">
      <TabsList className="flex w-full gap-2 justify-between border-b-2 h-[20%] max-h-20 rounded-none px-5">
        <h1 className="font-semibold text-md lg:text-3xl">{section}</h1>

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
        className={`${
          tabValue == "all" && "h-[80dvh]"
        }  overflow-scroll scroll w-full px-1 sm:px-5 pt-2 grid grid-cols-2 sm:flex gap-2 flex-nowrap sm:flex-wrap justify-center lg:justify-normal items-start`}
      >
        {Object.keys(allData)
          ?.filter((data) => {
            return filterProductData(allData[data], filterData);
          })
          .map((data, index) => {
            return (
              <ProductCard
                index={index}
                availableQty={allData[data].availableQty}
                addToWishlist={() =>
                  addToWishlist(
                    wishlistCart,
                    allData[data].slug,
                    1,
                    allData[data].price,
                    allData[data].title,
                    allData[data].size[0],
                    allData[data].color[0],
                    allData[data].img,
                    wishlistSubTotal
                  )
                }
                removeFromWishlist={() =>
                  removeFromWishlist(
                    wishlistCart,
                    allData[data].title,
                    1,
                    wishlistSubTotal
                  )
                }
                removeFromCart={() =>
                  removeFromCart(cart, allData[data].slug, 1, updateSubTotal)
                }
                key={allData[data]._id}
                category={allData[data].subCategory}
                ImageURL={allData[data].img}
                size={allData[data].size}
                color={allData[data].color}
                price={allData[data].price}
                title={allData[data].title}
                slug={allData[data].slug}
              />
            );
          })}
      </TabsContent>

      <TabsContent
        value="men"
        className={`${
          tabValue == "men" && "h-[80dvh]"
        }  overflow-scroll scroll w-full px-1 sm:px-5 grid grid-cols-2 sm:flex gap-2 flex-nowrap sm:flex-wrap justify-center lg:justify-normal items-start`}
      >
        {Object.keys(menData)
          ?.filter((data) => {
            return filterProductData(allData[data], filterData);
          })
          .map((data, index) => {
            return (
              <ProductCard
                index={index}
                availableQty={allData[data].availableQty}
                addToWishlist={() =>
                  addToWishlist(
                    wishlistCart,
                    allData[data].slug,
                    1,
                    allData[data].price,
                    allData[data].title,
                    allData[data].size[0],
                    allData[data].color[0],
                    allData[data].img,
                    wishlistSubTotal
                  )
                }
                removeFromWishlist={() =>
                  removeFromWishlist(
                    wishlistCart,
                    allData[data].title,
                    1,
                    wishlistSubTotal
                  )
                }
                removeFromCart={() =>
                  removeFromCart(cart, allData[data].slug, 1, updateSubTotal)
                }
                key={allData[data]._id}
                category={allData[data].subCategory}
                ImageURL={allData[data].img}
                size={allData[data].size}
                color={allData[data].color}
                price={allData[data].price}
                title={allData[data].title}
                slug={allData[data].slug}
              />
            );
          })}
      </TabsContent>

      <TabsContent
        value="women"
        className={`${
          tabValue == "women" && "h-[80dvh]"
        }  overflow-scroll scroll w-full px-1 sm:px-5 grid grid-cols-2 sm:flex gap-2 flex-nowrap sm:flex-wrap justify-center lg:justify-normal items-start`}
      >
        {Object.keys(womenData)
          ?.filter((data) => {
            return filterProductData(allData[data], filterData);
          })
          .map((data, index) => {
            return (
              <ProductCard
                index={index}
                availableQty={allData[data].availableQty}
                addToWishlist={() =>
                  addToWishlist(
                    wishlistCart,
                    allData[data].slug,
                    1,
                    allData[data].price,
                    allData[data].title,
                    allData[data].size[0],
                    allData[data].color[0],
                    allData[data].img,
                    wishlistSubTotal
                  )
                }
                removeFromWishlist={() =>
                  removeFromWishlist(
                    wishlistCart,
                    allData[data].title,
                    1,
                    wishlistSubTotal
                  )
                }
                removeFromCart={() =>
                  removeFromCart(cart, allData[data].slug, 1, updateSubTotal)
                }
                key={allData[data]._id}
                category={allData[data].subCategory}
                ImageURL={allData[data].img}
                size={allData[data].size}
                color={allData[data].color}
                price={allData[data].price}
                title={allData[data].title}
                slug={allData[data].slug}
              />
            );
          })}
      </TabsContent>
    </Tabs>
  );
};

const PopOverFilter = () => {
  const pathname = usePathname();
  const updateField = filter(useShallow((state) => state.updateField));
  const filterData = filter(useShallow((state) => state.filterData));
  const resetFilter = filter(useShallow((state) => state.resetFilter));
  const [colors, setColors] = useState({});
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const router = useRouter();

  const useFetchData = (fetchFunction, setterFunction) => {
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchFunction();
        setterFunction(data);
      };
      fetchData();
    }, []);
  };

  useFetchData(FetchAllColors, setColors);
  useFetchData(FetchAllCategory, setCategory);
  useFetchData(FetchAllSubCategory, setSubCategory);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-white text-lg rounded-xl hover:bg-grey.200 text-black">
          <SlidersHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Filter</h4>
          <div className="flex gap-3 items-center">
            <Label htmlFor="price">Price</Label>
            <p className="font-semibold">
              {`${filterData.budget[0] ?? 500}  - ${
                filterData.budget[1] ?? 2000
              }`}
            </p>
          </div>
          <Slider
            id="price"
            onValueChange={(e) => {
              updateField("budget", e);
            }}
            color="#f2f2f2"
            defaultValue={filterData.budget}
            max={10000}
            step={100}
          />

          {pathname != "/shop" && pathname != "/shop/new-arrival" && (
            <>
              {!pathname.includes("footwears") && (
                <RadioGroup
                  id="size"
                  defaultValue={filterData.size}
                  onValueChange={(e) => {
                    updateField("size", e);
                  }}
                  className="flex gap-2 flex-wrap items-center pt-8 relative"
                >
                  <Label htmlFor="size" className="absolute top-2">
                    Size
                  </Label>

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
              )}

              {pathname.includes("footwears") && (
                <RadioGroup
                  id="size"
                  defaultValue={filterData.size}
                  onValueChange={(e) => {
                    updateField("size", e);
                  }}
                  className="flex gap-2 flex-wrap items-center pt-8 relative"
                >
                  <Label htmlFor="size" className="absolute top-2">
                    Size
                  </Label>
                  <div className="flex items-center space-x-2 bg-grey px-2 py-2 rounded-lg cursor-pointer">
                    <RadioGroupItem value="6" id="1" className="bg-white" />
                    <Label htmlFor="1">6</Label>
                  </div>
                  <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
                    <RadioGroupItem value="7" id="2" className="bg-white" />
                    <Label htmlFor="2">7</Label>
                  </div>
                  <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
                    <RadioGroupItem value="8" id="3" className="bg-white" />
                    <Label htmlFor="3">8</Label>
                  </div>
                  <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
                    <RadioGroupItem value="9" id="4" className="bg-white" />
                    <Label htmlFor="4">9</Label>
                  </div>
                  <div className="flex items-center space-x-2  bg-grey px-2 py-2 rounded-lg cursor-pointer">
                    <RadioGroupItem value="10" id="5" className="bg-white" />
                    <Label htmlFor="5">10</Label>
                  </div>
                </RadioGroup>
              )}

              {!pathname.includes("winterwear") && (
                <RadioGroup
                  id="color"
                  defaultValue={filterData.color}
                  onValueChange={(e) => {
                    updateField("color", e);
                  }}
                  className="flex gap-2 flex-wrap items-center pt-8 relative"
                >
                  <Label htmlFor="color" className="absolute top-2">
                    Color
                  </Label>
                  {colors.length !== 0 &&
                    Array.isArray(colors) &&
                    colors.map((color, i) => (
                      <div
                        key={`${color}-${i}`}
                        className="flex items-center space-x-2 bg-grey px-2 py-2 rounded-lg cursor-pointer"
                      >
                        <RadioGroupItem
                          value={color}
                          id={color}
                          className="bg-white"
                        ></RadioGroupItem>
                        <Label htmlFor={color}>
                          <div
                            className="w-5 h-5 rounded-full border-2"
                            style={{ background: color }}
                          ></div>
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              )}
            </>
          )}
          {(pathname == "/shop" || pathname == "/shop/new-arrivals") && (
            <DropDown
              name="Category"
              value="Winterwear"
              data={category}
              updateField={(e) => updateField("category", e)}
            />
          )}

          <DropDown
            name="Subcategory"
            data={subCategory}
            updateField={(e) => updateField("subCategory", e)}
          />
        </div>
        <PopoverClose>
          <Button className="mt-4 bg-black text-white" onClick={resetFilter}>
            Clear Filter
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

const DropDown = ({ name, value, data, updateField }) => {
  return (
    <Select onValueChange={updateField} className="mt-2">
      <Label className="mt-5">{name}</Label>
      <SelectTrigger className="w-full font-semibold text-[#808080]">
        <SelectValue
          placeholder={`Select your ${name}`}
          className="placeholder:font-bold"
        />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {data ? (
            data.map((item, i) => (
              <SelectItem
                key={i}
                className="capitalize hover:bg-grey cursor-pointer transition-all"
                value={item}
              >
                {item}
              </SelectItem>
            ))
          ) : (
            <SelectItem
              className="uppercase hover:bg-grey cursor-pointer transition-all"
              value={value}
            >
              {value}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
