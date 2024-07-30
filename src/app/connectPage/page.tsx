'use client';

import Image from "next/image";
import lightIcon from "../../assets/light.svg";
import alertIcon from "../../assets/alert.svg";
import { RainbowButton } from "../../components/rainbowButton";
import { BoxCard } from "../../components/boxCard";
import { useEffect, useMemo } from "react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import { redirect } from "next/navigation";

export default function ConnectPage() {
  const { open } = useWeb3Modal();
  const { open: isOpen, selectedNetworkId } = useWeb3ModalState();
  const { address } = useAccount();

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
      footer={isOpen ? <RainbowButton text="Loading..." disabled={true} /> : <RainbowButton text="Connect Wallet" onClick={() => open()} />}
      className="mt-64 items-center"
    />;
  }, [isOpen, open]);

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
      footer={<RainbowButton text="Switch" onClick={() => open({ view: 'Networks' })} />}
      className="mt-64 items-center"
    />;
  }, [open]);

  const isWrongNetwork = address && (selectedNetworkId as string) != "1";

  useEffect(()=>{
    if(address) redirect(`/inputPage`);
  }, [address])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F0F2F7]">
      {isWrongNetwork ? wrongNetworkCard : defaultCard}
    </main>
  );
}

