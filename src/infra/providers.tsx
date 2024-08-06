'use client';

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { mainnet } from "wagmi/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { injected, safe, walletConnect } from 'wagmi/connectors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { http } from "viem";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styled/theme";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_PUBLIC || "";
const useTenderly = process.env.NEXT_PUBLIC_USE_TENDERLY=="yes" || false;

const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    safe(),
  ],
  transports: {
    [mainnet.id]: useTenderly ? http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`): http(),
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
          <ThemeProvider theme={theme}>
            {children}
            </ThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>

      ) : null}
    </>
  );
}


export { Providers }