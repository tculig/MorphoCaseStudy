'use client';

import { useCallback, useEffect, useState } from "react";
import { TopNav } from "../../components/topNav";
import metaMorphoFactoryAbi from "../../abi/metaMorphoFactory";
import { useAccount, useReadContract } from "wagmi";
import { useDebounce } from "use-debounce";
import { useVaultData } from "@/hooks/useVaultData";
import { redirect } from "next/navigation";
import { WithdrawCard } from "@/components/withdrawCard";
import { RainbowButton } from "@/components/rainbowButton";
import { CustomInput } from "@/components/customInput";
import { Hash, TransactionReceipt } from "viem";
import metaMorphoAbi from "../../abi/metaMorpho";
import { publicClient, walletClient } from "../clients";
import { TransactionCard } from "@/components/transactionCard";

export default function InputPage() {
  const [inputText, setInputText] = useState('');
  const [inputDebounced] = useDebounce(inputText, 500);
  const { address } = useAccount();
  const [hash, setHash] = useState<Hash>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  console.log(receipt)

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

  useEffect(() => {
    if (!address) redirect(`/connectPage`);
  }, [address]);

  const redeem = useCallback(() => {
    ; (async () => {
      if (!vaultData?.userShares || !address) throw "Invalid address or user shares!";
      const { request } = await publicClient.simulateContract({
        account: address,
        address: inputDebounced as `0x${string}`,
        abi: metaMorphoAbi,
        functionName: 'redeem',
        args: [vaultData?.userShares, address, address]
      })
      const hash = await walletClient.writeContract(request);
      setHash(hash)
    })()
  }, [address, inputDebounced, vaultData?.userShares])

  useEffect(() => {
    ; (async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        setReceipt(receipt)
      }
    })()
  }, [hash])

  const InputComponent = (
    <div key="inputComponent" className="flex flex-col p-5 pt-12 w-[350px] h-40 shadow-[0px_3px_12px_0px_#00000017] mt-48 border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026]">
      <label className="text-xs font-medium leading-4 mb-2">MetaMorpho Address</label>
      <CustomInput
        inputText={inputText}
        setInputText={setInputText}
        isValid={!!isValidVault}
        isInvalid={inputDebounced != "" && !isValidVault}
      />
    </div>
  );

  const WithdrawComponent = (
    vaultData ?
      <WithdrawCard
        key="withdrawComponent"
        className="mt-6"
        header="Flagship ETH"
        footer={<RainbowButton text="Withdraw userMax" onClick={() => redeem()} disabled={Number(vaultData.userMaxRedeem) == 0} />}
      >
        <div className="pt-5 pb-8">
          <div className="text-[11px] pb-1 font-medium leading-4 text-[#191D2080]">User shares</div>
          <div className="text-sm pb-3 font-normal leading-5 text-[#191D20F2]">{vaultData.formattedShares} {vaultData.vaultSymbol}</div>
          <div className="text-[11px] pb-1 font-medium leading-4 text-[#191D2080]">User assets</div>
          <div className="text-sm pb-2 font-normal leading-5 text-[#191D20F2]">{vaultData.formattedAssets} {vaultData.assetSymbol}</div>
        </div>
      </WithdrawCard>
      : null
  )

  const TransactionComponent = (
    <TransactionCard
      className="mt-64"
      isPending={false}
      isSuccess={false}
      isFailure={false}
      hash= "0xstring"
      onRetry={()=>{}}
      onReset={()=>{}}
    />
  )

  const content =
    (() => {
      if (hash) return TransactionComponent;
      return [InputComponent, WithdrawComponent];
    })()

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#F0F2F7]">
      <TopNav />
      {content}
    </main>
  );
}

