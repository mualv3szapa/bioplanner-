import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import cardCarousel from "@/assets/photos/cardcarousel.svg";
import doutora from "@/assets/photos/douturaDeolane.png";
import { MapPin } from "lucide-react";
import roulete from "@/assets/photos/roulete.svg"

export function CarouselDemo() {
  return (
    <Carousel className="w-[60%] max-w-xs mt-5">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 w-full h-full ">
                  <Image src={doutora} width={400} height={312} alt="sdsd" />

                  <div className="bg-[#F7F7F7] w-full flex flex-row gap-[60px]">
                    <div>
                      <h1 className="text-[#0F2167] font-bold text-[20px]">Dra. Ellen</h1>
                      <p className="text-[14px] font-thin">Dermatologista</p>

                      <div className="flex flex-row">
                        <MapPin color="red" size={14}/>
                        <p className="text-[#0F2167] font-thin text-[10px]">Moema-sp</p>
                      </div>
                    </div>

                    <p>3,0km</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export function Carousel2() {
  return (
    <Carousel className="w-[60%] max-w-xs mt-5">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <Image 
                  src={roulete}
                  width={239}
                  height={249}
                  alt=""
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
