import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";

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
  specialty: string;
  addresses: PhysicianAddress[];
};

interface MedListProps {
  physicians: Physician[];
}

export function MedList({ physicians }: MedListProps) {
  return (
    <ScrollArea className="w-[85%] h-72 rounded-md border">
      <div className="p-4 space-y-2">
        {physicians.map((physician, index) => (
          <div key={physician.id} className="animate-fadeIn">
            <div className="w-full h-[75px] flex flex-row justify-between items-center rounded-2xl px-2 gap-3">
              {/* Texto */}
              <div className="flex flex-col flex-1 min-w-0">
                {/* Nome animado limitado a 150px */}
                <div className="overflow-hidden whitespace-nowrap relative w-[150px]">
                  <span className="inline-block animate-marquee text-[16px] font-bold">
                    {physician.name}
                  </span>
                </div>

                <p className="text-[14px] truncate">{physician.specialty}</p>
                <p className="text-[14px] truncate">
                  {physician.addresses[0]?.city.name} -{" "}
                  {physician.addresses[0]?.city.state.id}
                </p>
              </div>

              {/* Botão */}
              <button className="bg-[#FF1935] text-white rounded-2xl w-[100px] h-[30px] shrink-0">
                Agendar
              </button>
            </div>

            {index < physicians.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
