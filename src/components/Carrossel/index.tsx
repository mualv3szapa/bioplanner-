import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Tipagens (é bom ter aqui também para o componente ser independente)
type PhysicianAddress = {
  id: number;
  street: string;
  number: string;
  district: string;
  city: { name: string; state: { id: string } };
  cep: string;
  distance?: number;
};

type Physician = {
  id: number;
  name: string;
  addresses: PhysicianAddress[];
};

interface CarouselDoctorsProps {
  physicians: Physician[];
}

export function CarouselDoctors({ physicians }: CarouselDoctorsProps) {
  return (
    <div className="w-full py-10">
      <Carousel
        opts={{
          align: "start",
          loop: physicians.length > 2, // Ativa o loop se houver mais de 2 médicos
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {physicians.map((physician) => {
            const address = physician.addresses[0];
            return (
              <CarouselItem
                key={physician.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-[3/4]">
                  {/* Imagem de Fundo */}
                  <Image
                    src="/doctor-placeholder.jpg" // Use uma imagem placeholder
                    alt={`Foto de ${physician.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Logo no canto superior direito */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow">
                    <Image
                      src="/logo-small.png"
                      alt="Bioplanner"
                      width={24}
                      height={24}
                    />
                  </div>

                  {/* Overlay de informações na parte inferior */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#0F2167] text-xl truncate">
                            Dra. {physician.name}
                          </h3>
                          <span className="text-sm text-gray-600">
                            Dermatologista
                          </span>
                        </div>
                        {address?.distance !== undefined && (
                          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                            {address.distance.toFixed(1)}km
                          </span>
                        )}
                      </div>
                      {address && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-[#FF1935]"
                          >
                            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9-22.045 22.045 0 01-2.582-1.9A20.759 20.759 0 013 12.499V7h14v5.5c0 .81-.12 1.603-.347 2.353a20.759 20.759 0 01-1.162.682 22.045 22.045 0 01-2.582 1.9-22.045 22.045 0 01-2.582 1.9l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                            <path d="M10 9a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                          <span className="font-medium">
                            {address.city.name}, {address.city.state.id}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-[-12px] md:ml-[-24px]" />
        <CarouselNext className="mr-[-12px] md:mr-[-24px]" />
      </Carousel>
    </div>
  );
}
