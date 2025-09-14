"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Image from "next/image";

// Componentes e Assets (usando os caminhos do seu código)
import { Header } from "@/components/Header";
import { CarouselDoctors } from "@/components/Carrossel";
import { StyledSwitch } from "@/components/Switch";
import JeJLogo from "@/assets/Logos/JeJlogo.png";
import MulherSorrindo from "@/assets/photos/beautiful-young-girl-touching-her-face-youth-skin-care-concept 1.svg";
import { MedList } from "@/components/MedList";
import { MedListSkeleton } from "@/components/MedList/MedListSkeleton"; // Importar o skeleton
import { HealthPlanCombobox } from "@/components/Combobox";
import secaoexplicando from "@/assets/photos/Group 35.svg"; // Importar o novo Combobox
import { MessageSquareMore, Smartphone } from "lucide-react";

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
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [healthPlansList, setHealthPlansList] = useState<string[]>([]);

  const fetchHealthPlans = useCallback(async () => {
    try {
      const response = await fetch("/api/healthplans");
      if (!response.ok) {
        throw new Error("Failed to fetch health plans");
      }
      const data = await response.json();
      setHealthPlansList(data);
    } catch (error) {
      console.error("Error fetching health plans:", error);
      // Fallback para lista estática em caso de erro
      setHealthPlansList(["Unimed", "Bradesco Saúde", "Amil", "SulAmérica"]);
    }
  }, []);

  useEffect(() => {
    fetchHealthPlans();
  }, [fetchHealthPlans]);

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
    setPhysicians([]); // Limpa a lista anterior enquanto carrega
    try {
      const params = new URLSearchParams({ city: viaCep.localidade });
      if (tipoPagamento === "convenio" && selectedConvenio) {
        params.append("healthplan", selectedConvenio);
      }
      const res = await fetch(`/api/physicians?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao buscar médicos.");
      setPhysicians(data);
      setSearchStatus("success");
    } catch (error: any) {
      console.error("Erro no handleSearch:", error);
      setSearchStatus("error");
    }
  };
  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Header />

      <main>
        <div className="px-5 py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-5 grid-rows-5 gap-4">
            {/* Linha 1-2: título */}
            <div className="col-span-5 row-span-2 pr-4">
              <h1 className="font-bold text-[#0F2167] text-3xl md:text-4xl leading-tight">
                Busque sua nova versão
              </h1>
              <h2 className="text-gray-600 text-lg mt-2 mb-8 max-w-md">
                com o apoio de dermatologistas{" "}
                <span className="text-[#FF1935] font-bold">
                  em constante atualização sobre Psoríase
                </span>
              </h2>
            </div>

            {/* Linha 3-5: formulário */}
            <div className="col-span-3 row-span-3 row-start-3 pr-6">
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
                  <HealthPlanCombobox
                    healthPlans={healthPlansList}
                    selectedHealthPlan={selectedConvenio}
                    onSelectHealthPlan={setSelectedConvenio}
                  />
                )}

                <div
                  className="relative"
                  style={{ width: "231.38px", height: "42px" }}
                >
                  <input
                    type="text"
                    placeholder="Digite CEP"
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

            {/* Linha 3-5: imagem */}
            <div className="col-span-2 row-span-3 col-start-4 row-start-3 flex justify-end items-end p-0">
              <div className="relative w-[140%] h-[120%] -mr-8 -mb-6">
                <Image
                  src={MulherSorrindo}
                  alt="Mulher sorrindo tocando o rosto"
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Container do Rodapé e Card +300 */}
        <div className="relative">
          {/* Rodapé Azul */}
          <div className="w-full h-24 bg-[#0F2167] flex items-center px-5">
            <div className="max-w-5xl mx-auto w-full relative">
              <Image
                src={JeJLogo}
                width={200}
                alt="Apoio Johnson & Johnson"
                className="object-contain"
              />
            </div>
          </div>

          {/* Card +300 posicionado sobre o rodapé */}
          <div
            className="
                absolute top-3 
                right-4 sm:right-8 md:right-16 lg:right-32 
                -translate-y-1/3
              bg-white rounded-2xl shadow-2xl 
                px-3 py-2 
                w-36 sm:w-40 md:w-44 
                text-left
              "
          >
            <span className="text-[#FF1935] font-bold text-3xl sm:text-4xl leading-tight">
              +300
            </span>
            <span className="text-[#0F2167] text-sm sm:text-base leading-tight block mt-1 font-semibold">
              dermatologistas à sua disposição
            </span>
          </div>
        </div>
      </main>

      {/* Seção de Resultados */}
      <div className="w-full px-5 mt-8 flex justify-center items-center">
        {searchStatus === "loading" ? (
          <MedListSkeleton />
        ) : physicians.length > 0 ? (
          <MedList physicians={physicians} />
        ) : searchStatus === "success" ? (
          <p className="text-center text-gray-600 my-10">
            Nenhum dermatologista encontrado.
          </p>
        ) : (
          <p className="text-center text-gray-600 my-10">
            Use os filtros para buscar dermatologistas.
          </p>
        )}
      </div>

      {/* Seção Psoríase */}
      <section className="relative w-full flex flex-col items-center bg-white mt-12">
        {/* Texto principal */}
        <div className="flex flex-col justify-center items-start text-left px-6">
          <h1 className="text-[#FF1935] text-2xl">Você não precisa conviver</h1>
          <h1 className="text-[#FF1935] text-2xl font-bold">
            com os incômodos da Psoríase!
          </h1>
          <p className="text-[#0F2167] text-sm mt-2">
            Receba orientações e prescrições de tratamento
          </p>
          <p className="text-[#0F2167] text-sm font-bold">
            de acordo com o seu perfil
          </p>
        </div>

        {/* Imagem + Cards */}
        <div className="relative w-full h-[480px] mt-6">
          <Image
            src={secaoexplicando}
            alt="Explicação"
            fill
            className="object-cover"
          />

          {/* Card superior */}
          <div className="absolute top-6 right-4 w-[260px] h-[69px] bg-white shadow-md rounded-xl px-4 py-3 flex flex-row gap-1.5 justify-center items-center">
            <MessageSquareMore size={76} color="#0F2167" />
            <p className="text-[#0F2167] text-[13px]">
              Receba uma segunda opinião do seu caso e{" "}
              <span className="font-bold">
                conheça novas opções de tratamento
              </span>
            </p>
          </div>

          {/* Card inferior */}
          <div className="absolute bottom-20 right-4 w-[245px] h-[72px] bg-white shadow-md rounded-xl px-4 py-3 flex flex-row gap-1.5 justify-center items-center">
            <Smartphone color="#0F2167" size={96} />
            <p className="text-[#0F2167] text-[13px]">
              <span className="font-bold">Marque sua consulta via </span>
              <span className="font-bold">WhatsApp</span> de forma simples e
              rápida! Sem burocracia
            </p>
          </div>
        </div>

        {/* Botão sobreposto */}
        <button
          onClick={scrollToForm}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
       w-[220px] h-[46px] bg-[#FF1935] text-white font-bold text-[20px] 
       rounded-full shadow-[0px_13px_22px_0px_rgba(0,_0,_0,_0.1)]"
        >
          Agende sua consulta
        </button>
      </section>

      <div>
        <h1>
          <span></span>
        </h1>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
