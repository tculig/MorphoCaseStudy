'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { goerli, mainnet } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const chains = [mainnet, goerli] as const;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const metadataWagmi = {
    name: "Morpho Case Study",
    description: "A Case Study for the position of Senior Frontend Developer at Morpho",
    url: "https://morpho.org/",
    icons: ["https://images.mirror-media.xyz/publication-images/UtVD8EcufAY17QsGz4QUT.png?height=1173&width=1173"],
};
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata: metadataWagmi });

createWeb3Modal({ wagmiConfig, projectId });

const Providers: FC<PropsWithChildren> = ({ children }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <>
            {ready ? (
                <WagmiProvider config={wagmiConfig}>
                    {children}
                </WagmiProvider>
            ) : null}
        </>
    );
}


export { Providers }