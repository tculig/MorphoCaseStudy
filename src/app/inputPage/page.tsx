'use client';

import { useEffect, useState } from "react";
import { InputCard } from "../../components/inputCard";
import { TopNav } from "../../components/topNav";
import metaMorphoFactoryAbi from "../../abi/metaMorphoFactory";
import metaMorphoAbi from "../../abi/metaMorpho";
import ERC20Abi from "../../abi/ERC20";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useDebounce } from "use-debounce";
import { publicClient } from '../clients'
import { getContract } from "viem";
import { useVaultData } from "@/hooks/useVaultData";
import { redirect } from "next/navigation";

const metaMorphoContract = {
  address: '0x38989bba00bdf8181f4082995b3deae96163ac5d',
  abi: metaMorphoAbi,
} as const
const ERC20Contract = {
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  abi: ERC20Abi,
} as const

export default function InputPage() {
  const [inputText, setInputText] = useState('0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB');
  const [inputDebounced] = useDebounce(inputText, 500);
  const { address } = useAccount();
  
  const { data: isValidVault, isError, isLoading } = useReadContract({
    abi: metaMorphoFactoryAbi,
    address: '0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101',
    functionName: 'isMetaMorpho',
    args: [inputDebounced as any],
  });

  const vaultData = useVaultData({
    addressVault: inputDebounced, 
    addressUser: address,
    enabled: !!isValidVault,
  });

  useEffect(()=>{
    if(!address) redirect(`/connectPage`);
  }, [address])

  console.log(vaultData)

  const { data: vault, isError: isErrorVault, isLoading: isLoadingVault } = useReadContracts({
    contracts: [
      {// vault.name
        ...metaMorphoContract,
        functionName: 'name',
      },
      {// vault.symbol
        ...metaMorphoContract,
        functionName: 'symbol',
      },
      {// vault.decimals
        ...metaMorphoContract,
        functionName: 'decimals',
      },
      {// vault.asset
        ...metaMorphoContract,
        functionName: 'asset',
      },
      {// vault.balanceOf
        ...metaMorphoContract,
        functionName: 'asset',
      },
      {// vault.convertToAssets
        ...metaMorphoContract,
        functionName: 'asset',
      },
      {// vault.maxRedeem
        ...metaMorphoContract,
        functionName: 'asset',
      },
      {// vault.convertToAssets
        ...metaMorphoContract,
        functionName: 'asset',
      },
      
    ],
    query: {
      enabled: !!isValidVault,
    }
  });

  console.log(vault)
  /* I we wanted to use view directly, this would be how.
    useEffect(() => {
      async function fetchData(): Promise<void> {
        try {
          // option #1
          const data = await publicClient.readContract({
            address: '0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101',
            abi: metaMorphoFactoryAbi,
            functionName: 'isMetaMorpho',
            args: [inputDebounced]
          });
          console.log(data)
          // option #2
          const mmFactory = getContract({
            address: '0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101',
            abi: metaMorphoFactoryAbi,
            client: publicClient,
          });
  
          const isMetamorpho = await mmFactory.read.isMetaMorpho([inputDebounced]);
  
          console.log(isMetamorpho)
        } catch (ex) {
          console.log(ex);
        }
      }
      fetchData();
    }, [inputDebounced]);
  */

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#F0F2F7]">
      <TopNav />
      <InputCard
        inputText={inputText}
        setInputText={setInputText}
      />
    </main>
  );
}

