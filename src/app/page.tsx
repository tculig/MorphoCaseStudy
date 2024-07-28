import Image from "next/image";
import lightIcon from "../assets/light.svg";
import alertIcon from "../assets/alert.svg";
import { RainbowButton } from "./(components)/rainbowButton";
import { BoxCard } from "./(components)/boxCard";
import { useMemo } from "react";

export default function Home() {
  const isLoading = false;

  const defaultCard = useMemo(() => {
    return <BoxCard
      icon={<Image
        src={lightIcon}
        alt="Logo"
        width={24}
        priority
      />}
      header="Welcome to Morpho"
      text="To get started, please connect your wallet bellow"
      button={isLoading ? <RainbowButton text="Loading..." disabled={true} /> : <RainbowButton text="Connect Wallet" />}
    />;
  }, [isLoading]);

  const wrongNetworkCard = useMemo(() => {
    return <BoxCard
      icon={<Image
        src={alertIcon}
        alt="Logo"
        width={24}
        priority
      />}
      header="Wrong network"
      text="You are not on Mainnet. Please click the button below to switch."
      button={<RainbowButton text="Switch" />}
    />;
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F0F2F7]">
      {defaultCard}
    </main>
  );
}

