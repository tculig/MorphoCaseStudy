'use client';

import metaMorphoAbi from "../abi/metaMorpho";
import ERC20Abi from "../abi/ERC20";
import { publicClient } from '../infra/clients'
import { formatUnits, getContract } from "viem";
import { useEffect, useState } from "react";
import { roundToDecimals } from "@/util";

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
  formattedShares?: string,
  formattedAssets?: string,
  assetSymbol?: string,
  assetDecimals?: number
}

interface VaultResult {
  data: VaultInfo | undefined,
  isLoading: boolean,
  isError: boolean,
}

const useVaultData = ({ addressVault, addressUser, enabled }: VaultParams): VaultResult => {
  const [data, setData] = useState<VaultInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData(): Promise<any> {
      setIsLoading(true);
      setIsError(false);
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

        const asset = getContract({
          address: vaultAsset,
          abi: ERC20Abi,
          client: publicClient,
        });

        const assetSymbol = await asset.read.symbol();
        const assetDecimals = await asset.read.decimals();

        const formattedShares = userShares ? roundToDecimals(formatUnits(userShares, vaultDecimals), 2).toFixed(2) : undefined;
        const formattedAssets = userAssets ? roundToDecimals(formatUnits(userAssets, assetDecimals), 2).toFixed(2) : undefined;

        setData({
          vaultName,
          vaultSymbol,
          vaultDecimals,
          vaultAsset,
          userShares,
          userMaxRedeem,
          userAssets,
          userMaxWithdraw,
          formattedShares,
          formattedAssets,
          assetSymbol,
          assetDecimals
        })
        setIsLoading(false);
      } catch (ex) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    if (enabled) fetchData();
  }, [addressUser, addressVault, enabled]);

  useEffect(() => {
    if (!enabled) setData(undefined);
  }, [enabled]);

  return {data, isLoading, isError};
}

export { useVaultData };
export type { VaultInfo }
