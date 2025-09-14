import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function MedListSkeleton() {
  return (
    <ScrollArea className="w-[85%] h-72 rounded-md border">
      <div className="p-4 space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <div className="w-full h-[75px] flex flex-row justify-between items-center rounded-2xl px-2 gap-3 animate-pulse">
              {/* Skeleton para o texto */}
              <div className="flex flex-col flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Skeleton para o botão */}
              <div className="bg-gray-200 rounded-2xl w-[100px] h-[30px] shrink-0"></div>
            </div>
            {index < 4 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

