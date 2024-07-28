'use client';

import Image from "next/image";
import lightIcon from "../assets/light.svg";
import alertIcon from "../assets/alert.svg";
import { RainbowButton } from "./(components)/rainbowButton";
import { BoxCard } from "./(components)/boxCard";
import { useMemo } from "react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import InputPage from "./inputPage/page";

export default function Home() {
  return (
    <InputPage/>
  );
}

