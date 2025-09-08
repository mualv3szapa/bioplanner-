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
import roulete from "@/assets/photos/roulete.svg";

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
                      <h1 className="text-[#0F2167] font-bold text-[20px]">
                        Dra. Ellen
                      </h1>
                      <p className="text-[14px] font-thin">Dermatologista</p>

                      <div className="flex flex-row">
                        <MapPin color="red" size={14} />
                        <p className="text-[#0F2167] font-thin text-[10px]">
                          Moema-sp
                        </p>
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
                <Image src={roulete} width={239} height={249} alt="" />
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

// Tipagem básica
type Physician = {
  id: number;
  name: string;
  addresses: {
    city: { name: string; state: { id: string } };
  }[];
};

interface CarouselDoctorsProps {
  physicians: Physician[];
}

export function CarouselDoctors({ physicians }: CarouselDoctorsProps) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {physicians.map((physician) => {
          const address = physician.addresses[0];

          return (
            <CarouselItem
              key={physician.id}
              className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="rounded-2xl overflow-hidden shadow-md">
                {/* Imagem do médico */}
                <div className="relative w-full h-64">
                  <Image
                    src="/doctor-placeholder.jpg" // 🔥 troca pela imagem da API se tiver
                    alt={physician.name}
                    fill
                    className="object-cover"
                  />

                  {/* Logo no canto superior direito */}
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                    <Image
                      src="/logo-small.png" // 🔥 troca pelo logo da Bioplanner
                      alt="Bioplanner"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>

                {/* Área de informações */}
                <div className="bg-white p-4 flex flex-col gap-1">
                  <h3 className="font-bold text-[#0F2167] text-lg">
                    Dra. {physician.name}
                  </h3>
                  <span className="text-sm text-gray-600">Dermatologista</span>

                  {/* Localização */}
                  {address && (
                    <div className="flex items-center gap-1 text-sm text-[#FF1935] mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21c4.418 0 8-4.03 8-9s-3.582-9-8-9-8 4.03-8 9 3.582 9 8 9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 12a2.25 2.25 0 100-4.5A2.25 2.25 0 0012 12z"
                        />
                      </svg>
                      <span>
                        {address.city.name}, {address.city.state.id}
                      </span>
                    </div>
                  )}

                  {/* Distância mockada (vamos calcular depois) */}
                  <span className="text-right text-sm font-semibold text-gray-700">
                    3,0 km
                  </span>
                </div>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
