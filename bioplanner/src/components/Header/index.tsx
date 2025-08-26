import Image from "next/image";
import BPLogo from "@/assets/Logos/BPLogo.png"
export const Header = () => {
    return(
        <div className="flex items-center pl-[50px] w-full h-[86px] bg-[#0F2167]">
            <Image
                src={BPLogo}
                width={152.83}
                height={27}
                alt="Bioplanner logo"
            />
        </div>

    );
}