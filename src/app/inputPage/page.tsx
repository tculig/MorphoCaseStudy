'use client';

import { useEffect, useState } from "react";
import { InputCard } from "../../components/inputCard";
import { TopNav } from "../../components/topNav";
import metaMorphoFactoryAbi from "../../abi/metaMorphoFactory";
import { useAccount, useReadContract } from "wagmi";
import { useDebounce } from "use-debounce";
import { useVaultData } from "@/hooks/useVaultData";
import { redirect } from "next/navigation";
import { BoxCard } from "@/components/boxCard";
import { RainbowButton } from "@/components/rainbowButton";


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

  console.log(vaultData)

  useEffect(() => {
    if (!address) redirect(`/connectPage`);
  }, [address])

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#F0F2F7]">
      <TopNav />
      <InputCard
        inputText={inputText}
        setInputText={setInputText}
      />
      {vaultData ?
        <BoxCard
          className="mt-8"
          header="Flagship ETH"
          footer={<RainbowButton text="Withdraw userMax" onClick={() => { }} />}
        >
          <div className="pt-6 pb-8">
            <div className="text-[11px] pb-1 font-medium leading-4 text-[#191D2080]">User shares</div>
            <div className="text-sm pb-2 font-normal leading-5 text-[#191D20F2]">{vaultData.formattedShares} {vaultData.vaultSymbol}</div>
            <div className="text-[11px] pb-1 font-medium leading-4 text-[#191D2080]">User assets</div>
            <div className="text-sm pb-2 font-normal leading-5 text-[#191D20F2]">{vaultData.formattedAssets} {vaultData.assetSymbol}</div>
          </div>
        </BoxCard>
        : null}
    </main>
  );
}

