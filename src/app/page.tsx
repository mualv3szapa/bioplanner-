"use client";

import { Header } from "@/components/Header";
import { SwitchBlue, SwitchRed } from "@/components/Switch";
import Image from "next/image";
import { useState, useEffect } from "react";
import mulherLoira from "@/assets/photos/beautiful-young-girl-touching-her-face-youth-skin-care-concept 1.svg";

const API_URL = "https://api.bioplanner.com.br/kira/physicians/2"; // Psoríase
const API_KEY = "c9fd1b20-2c9c-496e-8c0b-1d456f51e6cc"; // coloque sua API Key real

export default function Home() {
  const [cep, setCep] = useState("");
  const [tipoAtendimento, setTipoAtendimento] = useState<
    "particular" | "convenio"
  >("particular");
  const [modalidade, setModalidade] = useState<"online" | "presencial">(
    "online"
  );
  const [convenio, setConvenio] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const convenios = ["Unimed", "Bradesco Saúde", "Amil", "SulAmérica"];

  // 🔹 Busca cidade/estado pela ViaCEP
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            console.log("Logradouro:", data.logradouro);
            setCidade(data.localidade);
            setEstado(data.uf);
          }
        })
        .catch((err) => console.error("Erro ViaCEP:", err));
    }
  }, [cep]);

  // 🔹 Busca médicos na API Bioplanner
  useEffect(() => {
    const fetchMedicos = async () => {
      if (!cidade || !estado) return; // só chama quando tiver endereço resolvido

      try {
        const params = new URLSearchParams();
        params.append("city", cidade);
        params.append("state", estado);
        if (tipoAtendimento === "convenio" && convenio) {
          params.append("healthplan", convenio);
        }
        params.append(
          "acceptsRemote",
          modalidade === "online" ? "true" : "false"
        );

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          method: "GET",
          headers: {
            "api-key": API_KEY,
          },
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();

        console.log("🔹 Médicos encontrados:", data);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
      }
    };

    fetchMedicos();
  }, [cidade, estado, tipoAtendimento, convenio, modalidade]);

  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 w-full">
        {/* Títulos responsivos */}
        <h1 className="font-bold text-[#0F2167] text-[clamp(24px,5vw,28px)]">
          Busque sua nova versão
        </h1>

        <h2 className="text-[#0F2167] text-[clamp(19px,4vw,24px)] mb-[30px]">
          com o apoio de dermatologistas{" "}
          <span className="text-[#FF1935] font-bold text-[clamp(19px,4vw,24px)]">
            em constante atualização sobre Psoríase
          </span>
        </h2>

        <div className="flex flex-row items-start gap-4">
          <form>
            <div className="flex flex-col gap-4">
              {/* Switch Online / Presencial */}
              <SwitchRed value={modalidade} onChange={setModalidade} />

              {/* Switch Particular / Convênio */}
              <SwitchBlue
                value={tipoAtendimento}
                onChange={setTipoAtendimento}
              />

              {/* Select convênio */}
              {tipoAtendimento === "convenio" && (
                <select
                  value={convenio}
                  onChange={(e) => setConvenio(e.target.value)}
                  className="w-full max-w-[260px] sm:max-w-[300px] 
                             h-[clamp(50px,6vw,54px)] rounded-full 
                             shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] 
                             px-5 mt-[10px] text-[#0F2167] 
                             text-[clamp(14px,3vw,16px)]"
                >
                  <option value="">Selecione seu convênio</option>
                  {convenios.map((conv, i) => (
                    <option key={i} value={conv}>
                      {conv}
                    </option>
                  ))}
                </select>
              )}

              {/* Input CEP */}
              <input
                type="text"
                placeholder="Digite seu CEP"
                className="w-full max-w-[260px] sm:max-w-[300px] 
                           h-[clamp(50px,6vw,54px)] rounded-full 
                           shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] 
                           px-5 mt-[10px] text-[clamp(14px,3vw,16px)]"
                maxLength={8}
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </form>

          <Image
            src={mulherLoira}
            width={156}
            height={317}
            alt="Mulher"
            className="object-contain self-end"
          />
        </div>
      </div>
    </div>
  );
}
