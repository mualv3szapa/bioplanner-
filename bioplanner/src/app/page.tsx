import { Header } from "@/components/Header";
import Texto1 from "@/assets/text/texto1.svg";
import Image from "next/image";
import { SwitchBlue, SwitchRed } from "@/components/Switch";
import maistrezentos from "@/assets/text/maistrezentos.svg";
import JJLogoBranco from "@/assets/Logos/JJLogoBranco.png";
import DoctorCarousel from "@/components/Carrossel";
import Texto2 from "@/assets/text/texto2.svg";
import sim from "@/assets/photos/sim.png"
// import mulherloirapequena from "@/assets/photos/mulherloirapequena.png";
// import Estrela from "@/assets/Logos/Estrela kintsu (1) 1.png";
// import devicemesage from "@/assets/Logos/device-message.png"
// import { CarouselDoctor } from "@/components/Carrossel";
// import ToggleSwitch from "@/components/Switch";

export default function Home() {
  return (
    <div>
      <Image
        src={maistrezentos}
        width={126}
        height={75}
        alt=""
        className="z-10 absolute left-[251px] top-[495px]"
      />

      <Header />
      <div className="flex flex-col p-10 w-full">
        <Image src={Texto1} width={334} height={69} alt="" />

        <div className="flex flex-row w-full">
          <div className="flex flex-col gap-2 mt-[20px] mr-[43px]">
            <form action="">
              <div>
                <SwitchRed />
                <SwitchBlue />
              </div>

              <input
                type="text"
                placeholder="Digite seu CEP: "
                className="w-[230px] h-[46px] rounded-full shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] p-5 self-center mt-[23px]"
              />
              <button
                type="submit"
                className="w-[230px] h-[46px] rounded-full p-2 bg-[#FF1935] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white font-bold mt-12 mb-[50px]"
              >
                Buscar Dermatologistas...{" "}
              </button>
            </form>
          </div>

          {/* <div className="h-[317px] z-0 absolute bottom-[685px]">
            <Image
              className=""
              src={mulherloirapequena}
              width={279}
              height={317}
              alt=""
            />
          </div> */}
        </div>
      </div>
      <div className="w-full h-[78px] bg-[#0F2167] p-5 mt-[-40px]">
        <p className="text-[10px] text-[#ffffff]">Apoio</p>
        <Image src={JJLogoBranco} width={101} height={9} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <DoctorCarousel />

        <Image
          src={Texto2}
          width={333}
          height={75}
          alt=""
          className="mt-[20px]"
        />

        <div className="mt-[50px]">
          <Image
            src={sim}
            width={465}
            height={495}
            alt=""
          />

          <button className="bg-[#FF1935] w-[244px] rounded-full h-[46px] absolute left-[75px] bottom-[-416px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white">
            Agende sua consulta
          </button>
        </div>
      </div>
    </div>
  );
}
