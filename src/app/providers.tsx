'use client';

import "./globals.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { goerli, mainnet } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createConfig, WagmiProvider } from "wagmi";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { createPublicClient, defineChain, http } from "viem";
import { mainnet as mainnetViem} from "viem/chains";

export const tenderlyChain = defineChain({
    id: 1,
    name: 'Tenderly',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://virtual.mainnet.rpc.tenderly.co/39b6c299-6d00-4209-bcbe-0325866ccdbc'],
      },
    },
  })
const chains = [mainnet, goerli] as const;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_MAINNET || "";

const metadataWagmi = {
    name: "Morpho Case Study",
    description: "A Case Study for the position of Senior Frontend Developer at Morpho",
    url: "https://morpho.org/",
    icons: ["https://images.mirror-media.xyz/publication-images/UtVD8EcufAY17QsGz4QUT.png?height=1173&width=1173"],
};
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata: metadataWagmi });
const wagmiConfig = createConfig({
    chains: [mainnet],
    connectors: [
      injected(),
      walletConnect({ projectId }),
      safe(),
    ],
    transports: {
      [mainnet.id]: http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`),
    },
  })

createWeb3Modal({ wagmiConfig, projectId });
const queryClient = new QueryClient()

const client = createPublicClient({ 
  chain: mainnetViem, 
  transport: http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`) 
}) 

const Providers: FC<PropsWithChildren> = ({ children }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <>
            {ready ? (
                
                    <WagmiProvider config={wagmiConfig}>
                        <QueryClientProvider client={queryClient}>
                        {children}
                        </QueryClientProvider>
                    </WagmiProvider>
 
            ) : null}
        </>
    );
}


export { Providers }