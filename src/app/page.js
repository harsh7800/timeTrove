"use client";
import Link from "next/link";
import CartSheet from "./utilities/cartSheet";
import WishlistSheet from "./utilities/wishlistSheet";
import CheckLogin from "./utilities/CheckLogin";
// import Carousel from "./utilities/Carousel";
import Image from "next/image";
import banner from "../../public/banner.jpg";
import banner_mobile from "../../public/mobBanner.png";
import { Facebook, Instagram, Twitter } from "lucide-react";
import video from "./winter.mp4";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="w-full">
      <div className="bg-black w-full px-3 py-3 text-[10px] sm:text-[12px] text-center text-white uppercase">
        <h3>
          find stylish and curated selections that cater to individual tastes,
          ensuring your loved ones receive a gift 🎁 that reflects their unique
          style.
        </h3>
      </div>
      <div className="w-full px-2 md:px-[50px] items-center flex text-black font-semibold text-lg font-mono justify-between  py-5">
        <div className="hidden sm:flex w-fit gap-3 sm:gap-8 text-sm sm:text-lg">
          <Link href="/" className="hover:text-[#808080]">
            Home
          </Link>
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <Link href="/shop/new-arrivals" className="hover:text-black">
            Explore
          </Link>
          <Link href="/" className="hover:text-black"></Link>
        </div>
        <div className="w-fit relative cursor-pointer">
          <h1 className="text-black font-mono capitalize font-semibold text-md sm:text-3xl ">
            TimeTrove
          </h1>
          <div className="absolute left-[35%] sm:left-[35%] bg-purple rounded-xl w-[25px] sm:w-[50px] h-[4px]"></div>
        </div>
        <div className=" flex gap-2 sm:gap-4">
          <CartSheet />
          <WishlistSheet />
          <CheckLogin />
        </div>
      </div>
      <Image
        className="hidden lg:block border-b-[1px] w-full lg:object-center"
        src={banner}
        alt="banner"
      />
      <Image
        className="block lg:hidden border-b-[1px] w-full lg:object-center"
        src={banner_mobile}
        alt="banner"
      />
      <div className="max-w-[1800px] w-full mx-auto">
        <SeasonCollection />
      </div>
      <video
        playsInline
        className="aspect-video w-[95%]  rounded-2xl mx-auto mt-[50px] max-h-[700px]"
        controls
        autoPlay
        preload="none"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Footer />
      <div className="w-full h-[60px] text-[12px] sm:text-[15px]  text-white bg-black flex justify-between items-center px-2 sm:px-10 uppercase font-mono font-semibold">
        <p>
          <span className="text-[14px] sm:text-[20px]">&#169;</span> timetrove
          all rights reserved{" "}
        </p>
        <div className="flex items-center gap-3">
          <Instagram />
          <Facebook />
          <Twitter />
        </div>
      </div>
    </div>
  );
}

const SeasonCollection = () => {
  return (
    <div className="w-full text-center font-mono mt-[50px]">
      <h1 className="font-extrabold text-lg md:text-2xl uppercase">
        featured Collection
      </h1>
      <p className=" font-semibold text-[12px] md:text-lg text-[#b3b3b3]">
        Let us love Winter for it is the spring of genius
      </p>

      <div className="px-2 md:px-5 w-full h-fit md:h-[700px] flex flex-col md:flex-row justify-center gap-4 mt-[50px]">
        <div className="fade flex flex-col sm:flex-row md:block w-full md:w-fit md:space-y-4 gap-3 items-center">
          <div className="relative w-full sm:w-1/2 md:w-full h-[500px] md:h-[70%]">
            <Image
              className=" rounded-lg w-full h-[500px] md:h-[100%] md: object-cover transition-all md:md:hover:shadow-shadow-3 object-top"
              src="https://static.zara.net/assets/public/d8ee/02e7/c2ee4187b9f6/c246d5d8dc0a/04087438802-p/04087438802-p.jpg?ts=1708510215474&w=750"
              width={200}
              height={400}
              alt="cap"
            />
            <div className="absolute font-mono top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">Hoodie</h1>
                <Button className="hover:scale-125 transition-all bg-black rounded-3xl text-white font-bold text-xl mt-4">
                  Discover
                </Button>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-1/2 md:w-full h-[500px] md:h-[30%]">
            <Image
              className="rounded-lg bg-grey w-full h-[500px] md:h-full object-contain   transition-all md:hover:shadow-shadow-3"
              src="https://www.pngkey.com/png/full/73-738356_blue-jeans-png.png"
              width={200}
              height={400}
              alt="cap"
            />
            <div className="absolute font-mono top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">Jeans</h1>
                <Button className="hover:scale-125 transition-all bg-black rounded-3xl text-white font-bold text-xl mt-4">
                  Discover
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fade flex flex-col sm:flex-row md:block w-full md:w-fit md:space-y-4 gap-3 items-center">
          <div className="relative w-full sm:w-1/2 md:w-full h-[500px] md:h-[30%]">
            <Image
              className="rounded-lg w-full h-[500px] md:h-full object-cover  transition-all md:hover:shadow-shadow-3"
              src="https://bootmoodfoot.com/wp-content/uploads/2020/08/shutterstock_1366461125-1.jpg"
              width={200}
              height={300}
              alt="cap"
            />
            <div className="absolute font-mono top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">Footwear</h1>
                <Button className="hover:scale-125 transition-all bg-black rounded-3xl text-white font-bold text-xl mt-4">
                  Discover
                </Button>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-1/2 md:w-full h-[500px] md:h-[70%]">
            <Image
              className="rounded-lg w-full h-[500px] md:h-full object-cover  transition-all md:hover:shadow-shadow-3"
              src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1709986687_2371009.jpg?format=webp&w=480&dpr=1.0"
              width={200}
              height={400}
              alt="cap"
            />
            <div className="absolute font-mono top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">Jackets</h1>
                <Button className="hover:scale-125 transition-all bg-black rounded-3xl text-white font-bold text-xl mt-4">
                  Discover
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 h-[500px] md:h-full fade">
          <div className=" relative w-full h-full">
            <Image
              className="rounded-lg bg-grey w-full h-full object-cover   transition-all md:hover:shadow-shadow-3"
              src="https://www.theipodteacher.com/wp-content/uploads/2020/07/tobi-crop-tops-womens-peoria-black-ribbed-button-up-top-black.jpg"
              width={200}
              height={400}
              alt="cap"
            />
            <div className="absolute font-mono top-1/3 left-[40%] transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">Tops</h1>
                <Button className="hover:scale-125 transition-all bg-black rounded-3xl text-white font-bold text-xl mt-4">
                  Discover
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex items-start flex-col-reverse gap-5 md:flex-row justify-between px-2 sm:px-5 mt-[80px] py-5">
      <div className="w-fit space-y-3">
        <div className="w-fit relative cursor-pointer">
          <h1 className="text-black font-mono capitalize font-semibold text-lg sm:text-3xl ">
            TimeTrove
          </h1>
          <div className="absolute left-[35%] sm:left-[35%] bg-purple rounded-xl w-[25px] sm:w-[50px] h-[4px]"></div>
        </div>

        <div className="space-y-3 text-black w-[90%] sm:w-[350px] font-mono">
          <p className="text-[#808080] font-bold text-[14px] sm:text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus odio
          </p>
          <div className="flex w-full justify-start gap-2 md:gap-5">
            <input
              placeholder="Your Email"
              type="text"
              className="w-[60%] border-2 pl-5 border-black rounded-3xl"
            />
            <Button className="bg-black rounded-3xl px-[30px] text-white">
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className=" w-full md:w-fit flex gap-2 md:gap-5 justify-between font-mono text-[13px] text-[#808080]">
        <div className=" uppercase flex flex-col gap-1">
          <h3 className="font-bold text-black text-[16px]">product</h3>
          <Link href="/">t-shirt</Link>
          <Link href="/">hoodie</Link>
          <Link href="/">jackets</Link>
          <Link href="/">jeans</Link>
          <Link href="/">sneakers</Link>
        </div>
        <div className="uppercase flex flex-col gap-1">
          <h3 className="font-bold text-black text-[16px]">Categories</h3>
          <Link href="/">winterwear</Link>
          <Link href="/">footwears</Link>
          <Link href="/">topwears</Link>
          <Link href="/">bottomwears</Link>
        </div>
        <div className="uppercase flex flex-col gap-1">
          <h3 className="font-bold text-black text-[16px]">Help</h3>
          <Link href="/">customer service</Link>
          <Link href="/">legal & privacy</Link>
          <Link href="/">contact</Link>
        </div>
      </div>
    </div>
  );
};
