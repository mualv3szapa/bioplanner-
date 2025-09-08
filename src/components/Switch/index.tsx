"use client";
import { useState } from "react";

interface SwitchRedProps {
  value: "online" | "presencial";
  onChange: (val: "online" | "presencial") => void;
}

export const SwitchRed = ({ value, onChange }: SwitchRedProps) => {
  const [selected, setSelected] = useState<"online" | "presencial">("online");

  return (
    <div className="relative flex w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] rounded-full border border-[#FF1935] bg-white">
      {/* Fundo animado */}
      <div
        className={`absolute top-0 h-full w-1/2 rounded-full bg-[#FF1935] transition-all duration-300 ${
          selected === "online" ? "left-0" : "left-1/2"
        }`}
      />

      {/* Botão Online */}
      <button
        onClick={() => setSelected("online")}
        className={`relative z-10 flex-1 rounded-full px-3 xs:px-4 py-2 
                    h-[clamp(50px,7vw,60px)] 
                    text-[clamp(14px,3.5vw,16px)] font-medium 
                    transition-colors duration-300 ${
                      selected === "online" ? "text-white" : "text-[#FF1935]"
                    }`}
        type="button"
      >
        Online
      </button>

      {/* Botão Presencial */}
      <button
        onClick={() => setSelected("presencial")}
        className={`relative z-10 flex-1 rounded-full px-3 xs:px-4 py-2 
                    h-[clamp(50px,7vw,60px)] 
                    text-[clamp(14px,3.5vw,16px)] font-medium 
                    transition-colors duration-300 ${
                      selected === "presencial"
                        ? "text-white"
                        : "text-[#FF1935]"
                    }`}
        type="button"
      >
        Presencial
      </button>
    </div>
  );
};

interface SwitchBlueProps {
  value: "particular" | "convenio";
  onChange: (val: "particular" | "convenio") => void;
}

export const SwitchBlue = ({ value, onChange }: SwitchBlueProps) => {
  return (
    <div className="relative flex w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] rounded-full border border-[#0F2167] bg-white">
      {/* Fundo animado */}
      <div
        className={`absolute top-0 h-full w-1/2 rounded-full bg-[#0F2167] transition-all duration-300 ${
          value === "particular" ? "left-0" : "left-1/2"
        }`}
      />

      {/* Botão Particular */}
      <button
        onClick={() => onChange("particular")}
        className={`relative z-10 flex-1 rounded-full px-3 xs:px-4 py-2 
                    h-[clamp(50px,7vw,60px)] 
                    text-[clamp(14px,3.5vw,16px)] font-medium 
                    transition-colors duration-300 ${
                      value === "particular" ? "text-white" : "text-[#0F2167]"
                    }`}
        type="button"
      >
        Particular
      </button>

      {/* Botão Convênio */}
      <button
        onClick={() => onChange("convenio")}
        className={`relative z-10 flex-1 rounded-full px-3 xs:px-4 py-2 
                    h-[clamp(50px,7vw,60px)] 
                    text-[clamp(14px,3.5vw,16px)] font-medium 
                    transition-colors duration-300 ${
                      value === "convenio" ? "text-white" : "text-[#0F2167]"
                    }`}
        type="button"
      >
        Convênio
      </button>
    </div>
  );
};
