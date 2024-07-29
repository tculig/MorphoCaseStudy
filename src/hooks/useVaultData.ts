'use client';

import metaMorphoAbi from "../abi/metaMorpho";
import { publicClient } from '../app/clients'
import { getContract } from "viem";
import { useEffect, useState } from "react";

interface VaultParams {
  readonly addressVault: string,
  readonly addressUser: `0x${string}` | undefined,
  readonly enabled: boolean,
}

interface VaultInfo {
  vaultName?: string,
  vaultSymbol?: string,
  vaultDecimals?: number,
  vaultAsset?: string,
  userShares?: bigint,
  userMaxRedeem?: bigint,
  userAssets?: bigint,
  userMaxWithdraw?: bigint,
}

const useVaultData = ({ addressVault, addressUser, enabled }: VaultParams): VaultInfo | undefined => {
  const [data, setData] = useState<VaultInfo>();

  useEffect(() => {
    async function fetchData(): Promise<any> {
      try {
        const vault = getContract({
          address: addressVault as `0x${string}`,
          abi: metaMorphoAbi,
          client: publicClient,
        });

        const vaultName = await vault.read.name();
        const vaultSymbol = await vault.read.symbol();
        const vaultDecimals = await vault.read.decimals();
        const vaultAsset = await vault.read.asset();

        const userShares = addressUser ? await vault.read.balanceOf([addressUser]) : undefined;
        const userAssets = userShares ? await vault.read.convertToAssets([userShares]) : undefined;

        const userMaxRedeem = addressUser ? await vault.read.maxRedeem([addressUser]) : undefined;
        const userMaxWithdraw = userMaxRedeem ? await vault.read.convertToAssets([userMaxRedeem]) : undefined;

        setData({
          vaultName,
          vaultSymbol,
          vaultDecimals,
          vaultAsset,
          userShares,
          userMaxRedeem,
          userAssets,
          userMaxWithdraw
        })
      } catch (ex) {
        console.log(ex);
      }
    };
    if(enabled) fetchData();
  }, [addressUser, addressVault, enabled]);

  useEffect(()=>{
    if(!enabled) setData(undefined);
  },[enabled]);

  return data;
}

export { useVaultData };
