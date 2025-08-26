"use client";
import { useState } from "react";

export const SwitchRed = () => {
  const [selected, setSelected] = useState<"online" | "presencial">("online");

  return (
    <div className="relative flex w-[230px] rounded-full border border-red-500 bg-white">
      {/* Fundo animado */}
      <div
        className={`absolute top-0 h-full w-1/2 rounded-full bg-red-500 transition-all duration-300 ${
          selected === "online" ? "left-0" : "left-1/2"
        }`}
      />

      {/* Botão Online */}
      <button
        onClick={() => setSelected("online")}
        className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          selected === "online" ? "text-white" : "text-red-500"
        }`}
        type="button"
      >
        Online
      </button>

      {/* Botão Presencial */}
      <button
        onClick={() => setSelected("presencial")}
        className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          selected === "presencial" ? "text-white" : "text-red-500"
        }`}
        type="button"
      >
        Presencial
      </button>
    </div>
  );
};

export const SwitchBlue = () => {
  const [selected, setSelected] = useState<"particular" | "convenio">("particular");

  return (
    <div className="relative flex w-[230px] rounded-full border border-[#0F2167] bg-white mt-[25px]">
      {/* Fundo animado */}
      <div
        className={`absolute top-0 h-full w-1/2 rounded-full bg-[#0F2167] transition-all duration-300 ${
          selected === "particular" ? "left-0" : "left-1/2"
        }`}
      />

      {/* Botão Online */}
      <button
        onClick={() => setSelected("particular")}
        className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          selected === "particular" ? "text-white" : "text-[#0F2167]"
        }`}
        type="button"
      >
        Particular
      </button>

      {/* Botão Presencial */}
      <button
        onClick={() => setSelected("convenio")}
        className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          selected === "convenio" ? "text-white" : "text-[#0F2167]"
        }`}
        type="button"
      >
        Convenio
      </button>
    </div>
  );
};
