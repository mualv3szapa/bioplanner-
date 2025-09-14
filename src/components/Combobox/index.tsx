"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HealthPlanComboboxProps {
  healthPlans: string[];
  selectedHealthPlan: string;
  onSelectHealthPlan: (plan: string) => void;
}

export function HealthPlanCombobox({
  healthPlans,
  selectedHealthPlan,
  onSelectHealthPlan,
}: HealthPlanComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[231.38px] justify-between rounded-full border border-gray-300 bg-white px-5 text-gray-600 shadow-sm focus:ring-2 focus:ring-[#0F2167] focus:border-transparent"
        >
          {selectedHealthPlan
            ? healthPlans.find((plan) => plan === selectedHealthPlan)
            : "Selecione seu convênio..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[231.38px] p-0">
        <Command>
          <CommandInput placeholder="Buscar convênio..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum convênio encontrado.</CommandEmpty>
            <CommandGroup>
              {healthPlans.map((plan) => (
                <CommandItem
                  key={plan}
                  value={plan}
                  onSelect={(currentValue) => {
                    onSelectHealthPlan(
                      currentValue === selectedHealthPlan ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {plan}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedHealthPlan === plan ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
