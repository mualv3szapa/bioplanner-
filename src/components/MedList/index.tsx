import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

type PhysicianAddress = {
  id: number;
  street: string;
  number: string;
  district: string;
  city: { name: string; state: { id: string } };
  cep: string;
  whatsappNumber: string | null; // Adicionado whatsappNumber
  distance?: number;
};

type Physician = {
  id: number;
  name: string;
  specialty?: string;
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
          <div
            key={physician.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
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

              {/* Botão Agendar com Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#FF1935] text-white rounded-2xl w-[100px] h-[30px] shrink-0">
                    Agendar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{physician.name}</DialogTitle>
                    <DialogDescription>
                      {physician.addresses[0] ? (
                        <>
                          {physician.addresses[0].street},{" "}
                          {physician.addresses[0].number} -{" "}
                          {physician.addresses[0].district}
                          {physician.addresses[0].city.name} -{" "}
                          {physician.addresses[0].city.state.id},{" "}
                          {physician.addresses[0].cep}
                        </>
                      ) : (
                        "Endereço não disponível."
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    {physician.addresses[0]?.whatsappNumber ? (
                      <a
                        href={`https://wa.me/${physician.addresses[0].whatsappNumber.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#25D366] text-white hover:bg-[#1DA851] h-10 px-4 py-2"
                      >
                        Agendar via WhatsApp
                      </a>
                    ) : (
                      <Button disabled className="bg-gray-400 text-white">
                        WhatsApp não disponível
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {index < physicians.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
