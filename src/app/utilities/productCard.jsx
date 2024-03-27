"use client";
import { FaHeart } from "react-icons/fa";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LiaCartArrowDownSolid, LiaCartPlusSolid } from "react-icons/lia";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useCart, useStore, wishlist } from "../store/zustandStore";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next-nprogress-bar";
import { CheckCheck, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkout } from "../helpers/functions";
import { useToast } from "@/components/ui/use-toast";
import { getProductData } from "../helpers/action";
import { data } from "autoprefixer";
const ProductCard = ({
  index,
  category,
  title,
  price,
  ImageURL,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  size,
  color,
  availableQty,
  slug,
}) => {
  const router = useRouter();
  const wishlistCart = wishlist(useShallow((state) => state.wishlistCart));
  const cart = useCart(useShallow((state) => state.cart));
  return (
    <div
      className={`border w-full sm:w-[250px] h-[fit] px-2 py-2 rounded-lg relative hover:shadow-shadow-4 transition-all space-y-0.5  animate-fade-down animate-once animate-duration-[800ms] animate-delay-[${
        index * 50
      }] animate-ease-in-out animate-normal animate-fill-forwards`}
    >
      <div
        className={`w-full cursor-pointer border h-[250px] relative rounded-lg select-none`}
      >
        <Image
          onClick={() => router.push(`/shop/${slug}`)}
          src={ImageURL}
          width={250}
          height={250}
          className={`w-full object-cover h-full ${
            availableQty == 0 && "opacity-50"
          }`}
          alt="Product"
        />
        {availableQty == 0 && (
          <h1 className="absolute top-[50%] left-[15%] font-bold rotate-[-30deg] text-2xl opacity-70">
            Out Of Stock
          </h1>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-[#808080] text-sm opacity-60 capitalize">
          {category}
        </h3>
        <h3 className="font-semibold truncate w-5/6 text-sm">{title}</h3>
        <h3 className="font-bold text-sm">Rs {price}</h3>
      </div>
      {availableQty !== 0 ? (
        <div className=" w-full mt-5 flex gap-2 justify-between items-center">
          <BuyNowDrawer
            name={title}
            size={size}
            color={color}
            qty={1}
            price={price}
            img={ImageURL}
            slug={slug}
          />
          <Button
            className={`hidden bg-purple text-white hover:bg-white hover:text-black hover:border sm:block w-1/2 ${
              availableQty == 0 && "opacity-70 cursor-not-allowed"
            }`}
            onClick={() => router.push(`/shop/${slug}`)}
          >
            View
          </Button>
          {cart[slug] ? (
            <CheckCheck
              size={40}
              className={`block  sm:hidden w-1/2 text-[20px] rounded-lg h-[35px] bg-black   ${
                cart[slug] && "bg-white border text-purple.200 hover:bg-white"
              }`}
            />
          ) : (
            <LiaCartPlusSolid
              onClick={() => {
                if (availableQty !== 0) {
                  router.refresh();
                }
                addToCart();
              }}
              className="block sm:hidden w-1/2 rounded-lg h-[35px] bg-black text-white"
              size={40}
            />
          )}
        </div>
      ) : (
        <h1 className="font-semibold text-center py-2">
          Will be back in Stock soon
        </h1>
      )}
      {/* <div className="bg-purple absolute top-5 right-5 p-1 rounded-full"> */}
      <div
        onClick={() => {
          wishlistCart[title] ? removeFromWishlist() : addToWishlist();
          router.refresh();
        }}
        className="z-50 absolute top-5 right-5 border rounded-full p-1 bg-grey.200"
      >
        <FaHeart
          size={20}
          className={`cursor-pointer ${
            wishlistCart[title] ? "text-[#e60073]" : "text-white"
          } `}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductCard;

const BuyNowDrawer = ({ price, name, size, color, img, slug }) => {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [deliveryAddress, setdeliveryAddress] = useState({});
  const address = useStore((state) => state.user.billingAddress);
  const email = useStore((state) => state.user.email);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  return (
    <Drawer className="bg-white overflow-scroll">
      <DrawerTrigger asChild className="hidden sm:block">
        <Button
          className="w-1/2 bg-black text-white hover:bg-white hover:text-black hover:border"
          onClick={() => {
            router.refresh();
            setCart({
              [slug]: { qty: 1, price, name, size, color, img, slug },
            });
          }}
        >
          Quick Buy
        </Button>
      </DrawerTrigger>
      <DrawerTrigger
        asChild
        className="block sm:hidden bg-grey rounded-lg w-1/2 h-[35px]"
      >
        <LiaCartArrowDownSolid
          onClick={() => {
            router.refresh();
            setCart({
              [slug]: { qty: 1, price, name, size, color, img, slug },
            });
          }}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-white min-h-[500px] h-fit overflow-scroll">
        <DrawerHeader className="text-left pl-[15px] sm:pl-[50px]">
          <DrawerTitle className="font-bold text-2xl">
            Quick Buy Cart
          </DrawerTitle>
          <DrawerDescription className="font-semibold opacity-60">
            This is a quick buy option where you can buy the product in a snap
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center items-start gap-5 ">
          {cart[slug]?.qty != 0 && cart[slug]?.qty != 0 ? (
            <div className="w-[90%] sm:w-[500px] my-5 shadow-md  p-4 rounded-lg space-y-6">
              <h3 className="font-bold w-full text-start">Your Order</h3>
              {Object.keys(cart).map((product, i) => {
                return (
                  <QuickBuyProductCard
                    dropDown
                    productTitle={cart[product].name}
                    price={cart[product].price}
                    setCart={setCart}
                    slug={cart[product].slug}
                    key={i}
                    img={cart[product].img}
                    qty={cart[product].qty}
                    addToCart={() =>
                      setCart((prevCart) => ({
                        ...prevCart,
                        [product]: {
                          ...prevCart[product],
                          qty: prevCart[product].qty + 1,
                        },
                      }))
                    }
                    removeFromCart={() =>
                      setCart((prevCart) => ({
                        ...prevCart,
                        [product]: {
                          ...prevCart[product],
                          qty:
                            prevCart[product].qty - 1 > 0
                              ? prevCart[product].qty - 1
                              : 0,
                        },
                      }))
                    }
                  />
                );
              })}
              {cart.qty != 0 && cart.qty != 0 && (
                <div className="w-full">
                  <div className="w-full sm:w-[80%] flex items-center justify-between">
                    <p className="mt-2 font-semibold text-xs">Delivery</p>
                    <p className="mt-2 font-semibold text-xs">40</p>
                  </div>
                  <div className="w-full sm:w-[80%] mt-1 flex items-center justify-between">
                    <p className="mt-2 font-semibold text-xs">Discount</p>
                    <p className="mt-2 font-semibold text-xs">00</p>
                  </div>
                  <div className="w-full sm:w-[80%] mt-1 flex items-center text-xl justify-between">
                    <p className="mt-2 font-semibold">Total</p>
                    <p className="mt-2 font-bold">
                      {cart[Object.keys(cart)]?.qty != 0
                        ? cart[Object.keys(cart)]?.qty *
                          cart[Object.keys(cart)]?.price
                        : 0 || cart[Object.keys(cart)].price}
                    </p>
                  </div>
                </div>
              )}
              <div className="block lg:hidden border-1 shadow-lg rounded-lg px-7 py-3 w-[full] space-y-4">
                <h3 className="font-bold">Shipping Address</h3>
                <RadioGroup
                  defaultValue={deliveryAddress}
                  onValueChange={(value) => {
                    setdeliveryAddress(value);
                  }}
                >
                  {address &&
                    address?.map((addr, i) => {
                      return (
                        <div
                          className="flex items-center cursor-pointer space-x-2 space-y-2"
                          key={i}
                        >
                          <RadioGroupItem
                            value={addr}
                            id={i}
                            className="accent-purple text-purple"
                          />
                          <Label
                            htmlFor={i}
                            className="leading-5 cursor-pointer"
                          >
                            {addr.pincode}, {addr.addressName}, {addr.landmark},
                            &nbsp;{addr.city}, <br /> {addr.state}
                          </Label>
                        </div>
                      );
                    })}
                </RadioGroup>
              </div>

              <div className="w-full flex justify-center items-center gap-2">
                <DrawerClose asChild>
                  <Button
                    className="w-1/2 bg-grey text-black font-bold hover:bg-grey.200"
                    onClick={() => setCart({})}
                  >
                    Cancel
                  </Button>
                </DrawerClose>

                <Button
                  className={`w-1/2 bg-black text-white ${
                    Object.keys(deliveryAddress).length != 0 &&
                    "animate-shimmer"
                  } inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white-400 focus:ring-offset-2 focus:ring-offset-white-50`}
                  onClick={async () => {
                    let total =
                      cart[Object.keys(cart)]?.qty != 0
                        ? cart[Object.keys(cart)]?.qty *
                          cart[Object.keys(cart)]?.price
                        : 0;
                    await Checkout(
                      total,
                      email,
                      cart,
                      deliveryAddress,
                      router,
                      setLoading,
                      toast
                    );
                  }}
                  disabled={
                    Object.keys(deliveryAddress).length == 0 && !loading
                  }
                >
                  {loading && (
                    <Loader2 className="animate-spin mr-1" size={20} />
                  )}{" "}
                  Pay{" "}
                  {cart[Object.keys(cart)]?.qty != 0
                    ? cart[Object.keys(cart)]?.qty *
                      cart[Object.keys(cart)]?.price
                    : 0 || cart[Object.keys(cart)].price}
                  /-
                </Button>
              </div>
            </div>
          ) : (
            <h1 className="font-bold">Please add a product to continue</h1>
          )}
          {cart[slug]?.qty != 0 && cart[slug]?.qty != 0 && (
            <div className="hidden mt-2 lg:block border-2 rounded-lg px-7 py-3 w-[40%] max-w-[500px] space-y-4">
              {address?.length != 0 ? (
                <>
                  <h3 className="font-bold">Shipping Address</h3>
                  <p className="font-semibold text-sm text-[#b3b3b3]">
                    Select a Address To Checkout
                  </p>
                </>
              ) : (
                <div className="w-full space-y-2 flex flex-col items-center">
                  <h3 className="font-bold">No Address Found</h3>
                  <Button
                    className="font-bold bg-black text-white"
                    onClick={() =>
                      router.push(`/shop/account/billing/${email}`)
                    }
                  >
                    Add Address
                  </Button>
                </div>
              )}
              <RadioGroup
                defaultValue={deliveryAddress}
                onValueChange={(value) => {
                  setdeliveryAddress(value);
                }}
              >
                {address &&
                  address?.map((addr, i) => {
                    return (
                      <div
                        className="flex items-center space-x-2 space-y-2"
                        key={i}
                      >
                        <RadioGroupItem
                          value={addr}
                          id={addr._id}
                          className="accent-purple text-purple"
                        />
                        <Label htmlFor={addr._id} className="leading-5">
                          {addr.pincode}, {addr.addressName}, {addr.landmark},
                          &nbsp;{addr.city}, <br /> {addr.state}
                        </Label>
                      </div>
                    );
                  })}
              </RadioGroup>
            </div>
          )}
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const QuickBuyProductCard = ({
  clr,
  siz,
  setCart,
  addToCart,
  removeFromCart,
  img,
  qty,
  dropDown,
  slug,
  productTitle,
  price,
}) => {
  const router = useRouter();
  const [productData, setProductData] = useState({});
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [productSlug, setProductSlug] = useState(slug);
  const [image, setImage] = useState(img);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(slug);
        setProductData(data);
        setcolor(data.product.color);
        setsize(data.product.size);
        setCart({
          [`${data.variants[data.product.color][data.product.size].slug}-${
            data.product.size
          }-${data.product.color}`]: {
            qty: 1,
            price: data.product.price,
            name: data.product.title,
            size: data.product.size,
            color: data.product.color,
            img: data.product.img,
            slug: data.variants[data.product.color][data.product.size].slug,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`w-full flex items-center justify-start gap-4 animate-fade-left animate-once animate-duration-[800ms] animate-delay-[200] animate-ease-in-out animate-normal animate-fill-forwards`}
    >
      <Image
        className="w-[60px] sm:w-[90px] rounded-lg border"
        src={image}
        width={60}
        height={90}
        alt="product"
      />

      <div className="space-y-2">
        <h3 className="font-bold truncate w-full cursor-pointer">
          {productData?.product?.title || productTitle}
        </h3>
        <div
          className={`font-semibold ${!dropDown && "flex items-center gap-2"}`}
        >
          <div className="flex gap-1 items-center">
            {!dropDown && <p className="text-[#999999] text-sm">Color </p>}
            {!dropDown ? (
              <div
                className="border-2 w-4 h-4 rounded-full"
                style={{ background: color || clr }}
              ></div>
            ) : Object.keys(productData?.variants || {}).length === 0 ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              Object.keys(productData.variants || {}).map((variantColor) => {
                return (
                  Object.keys(productData.variants[variantColor]).includes(
                    size
                  ) && (
                    <button
                      key={variantColor}
                      onClick={() => {
                        {
                          setcolor(variantColor);
                          setImage(
                            productData?.variants[variantColor][size]?.img
                          );
                          setProductSlug(
                            productData.variants[variantColor][size].slug
                          );
                          setCart({
                            [`${productData.variants[variantColor][size].slug}-${size}-${variantColor}`]:
                              {
                                qty: 1,
                                price: productData.product.price,
                                name: productData.product.title,
                                size,
                                color: variantColor,
                                img: productData?.variants[variantColor][size]
                                  ?.img,
                                slug: productData.variants[variantColor][size]
                                  .slug,
                              },
                          });
                        }
                      }}
                      style={{ background: variantColor }}
                      className={`border-[3px] ${
                        color == variantColor && "border-black border-[3px]"
                      }  ml-1 rounded-full ${
                        color == variantColor ? "w-6 h-6" : "w-5 h-5"
                      } focus:outline-none`}
                    ></button>
                  )
                );
              })
            )}
          </div>
          <div className="flex gap-1 items-center">
            {!dropDown ? (
              <p className="text-[#999999] text-sm">Size {size || siz} </p>
            ) : (
              <div className="text-[#999999] text-sm flex items-center gap-1  ">
                {Object.keys(productData?.variants || {}).length === 0 ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  Object.keys(productData.variants[color]).map((buttonSize) => (
                    <Button
                      key={buttonSize}
                      onClick={() => {
                        setsize(buttonSize);
                        setImage(productData?.variants[color][buttonSize]?.img);
                        setProductSlug(
                          productData.variants[color][buttonSize].slug
                        );
                        setCart({
                          [`${productData.variants[color][buttonSize].slug}-${buttonSize}-${color}`]:
                            {
                              qty: 1,
                              price: productData.product.price,
                              name: productData.product.title,
                              size: buttonSize,
                              color,
                              img: productData?.variants[color][buttonSize]
                                ?.img,
                              slug: productData.variants[color][buttonSize]
                                .slug,
                            },
                        });
                      }}
                      className={`${
                        size == buttonSize
                          ? "bg-purple text-white"
                          : "bg-grey text-black"
                      } border mt-2 rounded-lg w-7 h-7`}
                    >
                      {buttonSize}
                    </Button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <p className="font-bold flex items-center gap-2 text-sm sm:text-md">
          Rs {productData?.product?.price || price}{" "}
          <span className=" flex items-center gap-2 text-[#999999] ml-1 font-medium text-sm">
            Qty{" "}
            <span className="flex items-center gap-1 sm:gap-3 text-purple font-bold select-none">
              <FaMinus
                onClick={() => {
                  if (qty <= 1) {
                    router.refresh();
                  }
                  removeFromCart();
                }}
                size={20}
                className="cursor-pointer p-1 bg-black rounded-full text-white"
              />
              {qty}
              <FaPlus
                onClick={addToCart}
                size={20}
                className="cursor-pointer p-1 bg-black rounded-full text-white"
              />
            </span>{" "}
          </span>
        </p>
      </div>
    </div>
  );
};
