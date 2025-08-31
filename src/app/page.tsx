import { Header } from "@/components/Header";
import Texto1 from "@/assets/text/texto1.svg";
import Image from "next/image";
import { SwitchBlue, SwitchRed } from "@/components/Switch";
import maistrezentos from "@/assets/text/maistrezentos.svg";
import JJLogoBranco from "@/assets/Logos/JJLogoBranco.png";
// import DoctorCarousel from "@/components/Carrossel";
import Texto2 from "@/assets/text/texto2.svg";
import sim from "@/assets/photos/sim.svg";
import loiraCortada from "@/assets/photos/loiraCortada.png";
import { Carousel2, CarouselDemo } from "@/components/Carrossel";
import Card3 from "@/assets/photos/card3.svg";
import depos from "@/assets/text/depos.svg";
import Confira from "@/assets/text/ConfiraaexperiênciaBioplanner.svg";
import logo3 from "@/assets/Logos/Logo (sem tagline)-1 3.svg";
import umdostextos from "@/assets/text/umdostextos.svg";
import hehehe from "@/assets/photos/hehehehehehe.svg";
import hahaha from "@/assets/photos/hjahhaahhaha.svg";
import { AccordionDemo } from "@/components/Acordeon";

import footer from "@/assets/photos/Group 31.svg";
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
      <div className="flex flex-col p-5 w-full">
        <Image src={Texto1} width={334} height={69} alt="" />

        <div className="flex flex-row w-full">
          <div className="flex flex-col gap-2 mt-[20px]  w-[230px]">
            <form action="">
              <div>
                <SwitchRed />
                <SwitchBlue />
              </div>

              <input
                type="text"
                placeholder="Digite seu CEP: "
                className=" h-[46px] rounded-full shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] p-5 self-center mt-[23px]"
              />
              <button
                type="submit"
                className=" h-[46px] rounded-full p-2 bg-[#FF1935] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white font-bold mt-12 mb-[50px]"
              >
                Buscar Dermatologistas...{" "}
              </button>
            </form>
          </div>

          {/* <div className="w-[279px] h-[317px]"> */}
          {/* <Image
            className=""
            src={loiraCortada}
            width={279}
            height={317}
            alt=""
          /> */}
          {/* </div> */}
        </div>
      </div>
      <div className="w-full h-[78px] bg-[#0F2167] p-5 mt-[-40px]">
        <p className="text-[10px] text-[#ffffff]">Apoio</p>
        <Image src={JJLogoBranco} width={101} height={9} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* <DoctorCarousel /> */}

        <CarouselDemo />

        <Image
          src={Texto2}
          width={333}
          height={75}
          alt=""
          className="mt-[20px]"
        />

        <div className="mt-[50px]">
          <Image src={sim} width={465} height={495} alt="" />

          <button className="bg-[#FF1935] w-[244px] rounded-full h-[46px] absolute left-[75px] bottom-[-406px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white mb-[90px]">
            Agende sua consulta
          </button>

          <div className="w-[90%] ml-[39px] ">
            <Image src={Card3} width={516} height={677} alt="" />
          </div>

          <div className="w-full h-[650px] bg-[#0F2167] flex flex-col justify-center items-center gap-[20px] pt-[10px] mb-[50px ]">
            <Image src={Confira} width={297} height={71} alt="" />

            <Carousel2 />

            <Image src={depos} width={297} height={71} alt="" />

            <Image src={logo3} width={90} height={19} alt="" />
          </div>

          <div className="flex flex-col justify-center items-center mt-[50px]">
            <Image src={umdostextos} width={307} height={62} alt="" />

            <Image
              src={hehehe}
              width={641}
              height={1857}
              alt=""
              className="mt-[25px]"
            />

            <button className="bg-[#0F2167] w-[244px] rounded-full h-[46px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white mb-[90px]">
              Agendar consulta
            </button>

            <Image src={hahaha} width={392} height={877} alt="" />

            <AccordionDemo />

            <button className="bg-[#FF1935] w-[244px] rounded-full h-[46px] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] text-white mb-[90px]">
              Agende sua consulta
            </button>

            <Image src={footer} width={392} height={71} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
