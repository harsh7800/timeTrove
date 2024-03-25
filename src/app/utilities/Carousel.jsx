"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const CarouselBG = () => {
  return (
    <Carousel className="w-full h-[500px] border">
      <CarouselContent className="border w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="">Box-{index + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselBG;
