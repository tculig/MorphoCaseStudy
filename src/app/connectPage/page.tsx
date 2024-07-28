'use client';

import Image from "next/image";
import lightIcon from "../assets/light.svg";
import alertIcon from "../assets/alert.svg";
import { RainbowButton } from "../(components)/rainbowButton";
import { BoxCard } from "../(components)/boxCard";
import { useMemo } from "react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

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
      button={isOpen ? <RainbowButton text="Loading..." disabled={true} /> : <RainbowButton text="Connect Wallet" onClick={() => open()} />}
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
      button={<RainbowButton text="Switch" onClick={() => open({ view: 'Networks' })} />}
    />;
  }, [open]);

  const isWrongNetwork = address && (selectedNetworkId as string) != "1";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#F0F2F7]">
      {isWrongNetwork ? wrongNetworkCard : defaultCard}
    </main>
  );
}

