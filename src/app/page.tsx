"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

// Componentes e Assets (usando os caminhos do seu código)
import { Header } from "@/components/Header";
import { CarouselDoctors } from "@/components/Carrossel";
import { StyledSwitch } from "@/components/Switch";
import JeJLogo from "@/assets/Logos/Opera Instantâneo_2025-09-08_103033_www.figma.com.png";
import MulherSorrindo from "@/assets/photos/beautiful-young-girl-touching-her-face-youth-skin-care-concept 1.svg";

// Tipagens
type PhysicianAddress = {
  id: number;
  street: string;
  number: string;
  district: string;
  city: { name: string; state: { id: string } };
  cep: string;
  distance?: number;
};
type Physician = { id: number; name: string; addresses: PhysicianAddress[] };
type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export default function Home() {
  // A lógica de states e funções está correta e permanece a mesma.
  const [tipoAtendimento, setTipoAtendimento] = useState<
    "presencial" | "online"
  >("presencial");
  const [tipoPagamento, setTipoPagamento] = useState<"particular" | "convenio">(
    "particular"
  );
  const [selectedConvenio, setSelectedConvenio] = useState<string>("");
  const [cepMasked, setCepMasked] = useState("");
  const cepDigits = useMemo(() => cepMasked.replace(/\D/g, ""), [cepMasked]);
  const [viaCep, setViaCep] = useState<ViaCepResponse | null>(null);
  const [cepStatus, setCepStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [cepError, setCepError] = useState<string | null>(null);
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const convenios = ["Unimed", "Bradesco Saúde", "Amil", "SulAmérica"];

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    setCepMasked(value);
  };

  useEffect(() => {
    if (cepDigits.length !== 8) {
      setViaCep(null);
      setCepStatus("idle");
      setCepError(null);
      return;
    }
    const fetchCep = async () => {
      setCepStatus("loading");
      try {
        const res = await fetch(`/api/cep?cep=${cepDigits}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "CEP não encontrado.");
        setViaCep(data);
        setCepStatus("ok");
        setCepError(null);
      } catch (err: any) {
        setViaCep(null);
        setCepStatus("error");
        setCepError(err.message);
      }
    };
    fetchCep();
  }, [cepDigits]);

  const enderecoPreview = useMemo(() => {
    if (!viaCep) return "";
    return `${viaCep.logradouro}, ${viaCep.bairro} - ${viaCep.localidade}/${viaCep.uf}`;
  }, [viaCep]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cepStatus !== "ok" || !viaCep) {
      alert("Por favor, insira um CEP válido.");
      return;
    }
    if (tipoPagamento === "convenio" && !selectedConvenio) {
      alert("Por favor, selecione um convênio.");
      return;
    }
    setSearchStatus("loading");
    setPhysicians([]);
    try {
      const params = new URLSearchParams({ city: viaCep.localidade });
      if (tipoPagamento === "convenio" && selectedConvenio) {
        params.append("healthplan", selectedConvenio);
      }
      const res = await fetch(`/api/physicians?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao buscar médicos.");
      setPhysicians(data);
      setSearchStatus("ok");
    } catch (error: any) {
      console.error("Erro no handleSearch:", error);
      setSearchStatus("error");
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Header />

      <main>
        <div className="px-5 py-8">
          {/* [CORREÇÃO] Forcei layout lado-a-lado mesmo no mobile */}
          <div className="max-w-5xl mx-auto flex flex-row items-center justify-center gap-4">
            {/* Coluna 1: Formulário - ajustei para w-2/3 para caber ao lado da imagem no mobile */}
            <div className="w-2/3 flex flex-col items-start order-1">
              <h1 className="font-bold text-[#0F2167] text-3xl md:text-4xl leading-tight">
                Busque sua nova versão
              </h1>
              <h2 className="text-gray-600 text-lg mt-2 mb-8 max-w-md">
                com o apoio de dermatologistas{" "}
                <span className="text-[#FF1935] font-bold">
                  em constante atualização sobre Psoríase
                </span>
              </h2>

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-5 items-start"
              >
                <StyledSwitch
                  theme="red"
                  selectedValue={tipoAtendimento}
                  onValueChange={setTipoAtendimento}
                  options={[
                    { value: "online", label: "Online" },
                    { value: "presencial", label: "Presencial" },
                  ]}
                />
                <StyledSwitch
                  theme="blue"
                  selectedValue={tipoPagamento}
                  onValueChange={setTipoPagamento}
                  options={[
                    { value: "particular", label: "Particular" },
                    { value: "convenio", label: "Convênio" },
                  ]}
                />

                {tipoPagamento === "convenio" && (
                  <select
                    style={{ width: "231.38px", height: "42px" }}
                    className="rounded-full border border-gray-300 bg-white px-5 text-gray-600 shadow-sm focus:ring-2 focus:ring-[#0F2167] focus:border-transparent"
                    value={selectedConvenio}
                    onChange={(e) => setSelectedConvenio(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione seu convênio
                    </option>
                    {convenios.map((conv) => (
                      <option key={conv} value={conv}>
                        {conv}
                      </option>
                    ))}
                  </select>
                )}

                <div
                  className="relative"
                  style={{ width: "231.38px", height: "42px" }}
                >
                  <input
                    type="text"
                    placeholder="Digite CEP, região ou endereço"
                    inputMode="numeric"
                    maxLength={9}
                    value={cepMasked}
                    onChange={handleCepChange}
                    className="w-full h-full rounded-full border border-gray-300 bg-white px-5 pr-12 text-gray-800 text-sm shadow-sm focus:ring-2 focus:ring-[#0F2167] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-h-[20px] text-sm px-2 -mt-3">
                  {cepStatus === "ok" && (
                    <span className="text-gray-600">{enderecoPreview}</span>
                  )}
                  {cepStatus === "error" && (
                    <span className="text-red-600">{cepError}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cepStatus !== "ok" || searchStatus === "loading"}
                  style={{ width: "231.38px", height: "42px" }}
                  className="rounded-full bg-[#FF1935] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {searchStatus === "loading"
                    ? "Buscando..."
                    : "Buscar dermatologistas"}
                  {searchStatus !== "loading" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  )}
                </button>
              </form>
            </div>

            {/* Coluna 2: Imagem - ajustada para w-1/3 e sem margem superior no mobile */}
            <div className="w-1/3 flex-shrink-0 order-2 mt-0 md:mt-0 md:ml-[-100px]">
              <div
                className="relative mx-auto md:mx-0"
                style={{ width: "200px", height: "250px" }}
              >
                <Image
                  src={MulherSorrindo}
                  alt="Mulher sorrindo tocando o rosto"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Container do Rodapé e Card +300 */}
        <div className="relative mt-12">
          {/* Rodapé Azul */}
          <div className="w-full h-24 bg-[#0F2167] flex items-center px-5">
            <div className="max-w-5xl mx-auto w-full relative">
              <span className="text-white/70 text-xs absolute -top-6 left-0">
                Apoio
              </span>
              <Image
                src={JeJLogo}
                width={150}
                alt="Apoio Johnson & Johnson"
                className="object-contain"
              />
            </div>
          </div>

          {/* Card +300 posicionado sobre o rodapé */}
          <div className="absolute top-0 right-5 sm:right-10 md:right-20 lg:right-40 -translate-y-1/2 bg-white rounded-2xl shadow-2xl px-5 py-3 w-48 text-left">
            <span className="text-[#FF1935] font-bold text-3xl leading-tight">
              +300
            </span>
            <span className="text-[#0F2167] text-sm leading-tight block mt-1">
              dermatologistas à sua disposição
            </span>
          </div>
        </div>
      </main>

      {/* Seção de Resultados */}
      <div className="w-full px-5 mt-8">
        {searchStatus === "ok" && physicians.length > 0 && (
          <CarouselDoctors physicians={physicians} />
        )}
        {searchStatus === "ok" && physicians.length === 0 && (
          <p className="text-center text-gray-600 my-10">
            Nenhum dermatologista encontrado.
          </p>
        )}
        {searchStatus === "error" && (
          <p className="text-center text-red-600 my-10">
            Ocorreu um erro ao buscar os médicos.
          </p>
        )}
      </div>
    </div>
  );
}
