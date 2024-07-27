import Image from "next/image";
import lightIcon from "../assets/light.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F0F2F7]">
      <div className="flex flex-col p-4 justify-center text-center items-center w-[350px] h-[350px] shadow-[0px_3px_12px_0px_#00000017] mt-64 border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026]">
        <Image
          src={lightIcon}
          alt="Logo"
          width={24}
          priority
        />
        <div className="text-xl py-2 text-[#191D20F2]">Welcome to Morpho</div>
        <div className="text-sm pb-12 text-[#191D20B2]">To get started, please connect your wallet bellow</div>
        <button type="button" className="leading-8 p-1 w-full rounded text-[white] bg-[linear-gradient(223.53deg,#A5FECA_3.65%,#3EDCEB_31.56%,#2594FF_65.16%,#5533FF_102.22%)]">Connect Wallet</button>
      </div>
    </main>
  );
}

