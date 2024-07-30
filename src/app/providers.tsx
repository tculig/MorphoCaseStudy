'use client';

import "./globals.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { mainnet } from "wagmi/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { injected, safe, walletConnect } from 'wagmi/connectors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { defineChain, http } from "viem";

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

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_MAINNET || "";

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