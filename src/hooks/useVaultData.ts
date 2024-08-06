'use client';

import metaMorphoAbi from "../abi/metaMorpho";
import ERC20Abi from "../abi/ERC20";
import { publicClient } from '../infra/clients'
import { formatUnits } from "viem";
import { useEffect, useRef, useState } from "react";
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
  const sessionRef = useRef(0);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      setIsError(false);
      // For stale request rejection tracking
      const sessionNumber = sessionRef.current + 1;
      sessionRef.current = sessionNumber;

      try {
        const morphoContract = {
          address: addressVault as `0x${string}`,
          abi: metaMorphoAbi,
        } as const;

        if (!addressUser) throw "Address is undefined";
        const call1results = await publicClient.multicall({
          contracts: [
            {
              ...morphoContract,
              functionName: 'name',
            },
            {
              ...morphoContract,
              functionName: 'symbol',
            },
            {
              ...morphoContract,
              functionName: 'decimals'
            },
            {
              ...morphoContract,
              functionName: 'asset'
            },
            {
              ...morphoContract,
              functionName: 'balanceOf',
              args: [addressUser]
            },
            {
              ...morphoContract,
              functionName: 'maxRedeem',
              args: [addressUser]
            }
          ]
        });

        const vaultName = call1results[0]?.status == "success" ? call1results[0]?.result : undefined;
        const vaultSymbol = call1results[1]?.status == "success" ? call1results[1]?.result : undefined;
        const vaultDecimals = call1results[2]?.status == "success" ? call1results[2]?.result : undefined;
        const vaultAsset = call1results[3]?.status == "success" ? call1results[3]?.result : undefined;
        const userShares = call1results[4]?.status == "success" ? call1results[4]?.result : undefined;
        const userMaxRedeem = call1results[5]?.status == "success" ? call1results[5]?.result : undefined;

        if (!userShares || !userMaxRedeem) throw "Something went wrong";

        const call2results = await publicClient.multicall({
          contracts: [
            {
              ...morphoContract,
              functionName: 'convertToAssets',
              args: [userShares]
            },
            {
              ...morphoContract,
              functionName: 'convertToAssets',
              args: [userMaxRedeem]
            }
          ]
        });

        const userAssets = call2results[0]?.status == "success" ? call2results[0]?.result : undefined;
        const userMaxWithdraw = call2results[1]?.status == "success" ? call2results[1]?.result : undefined;

        const assetContract = {
          address: vaultAsset!,
          abi: ERC20Abi,
        } as const;

        const call3results = await publicClient.multicall({
          contracts: [
            {
              ...assetContract,
              functionName: 'symbol',
            },
            {
              ...assetContract,
              functionName: 'decimals',
            }
          ]
        });

        const assetSymbol = call3results[0]?.status == "success" ? call3results[0]?.result : undefined;
        const assetDecimals = call3results[1]?.status == "success" ? call3results[1]?.result : undefined;

        if (!vaultDecimals || !assetDecimals) throw "Something went wrong";

        const formattedShares = userShares ? roundToDecimals(formatUnits(userShares, vaultDecimals), 2).toFixed(2) : undefined;
        const formattedAssets = userAssets ? roundToDecimals(formatUnits(userAssets, assetDecimals), 2).toFixed(2) : undefined;
        const result = {
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
        };

        if (Object.values(result).includes(undefined)) throw "Something went wrong"

        if(sessionNumber==sessionRef.current){
          setData(result)
          setIsLoading(false);
        }
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

  return { data, isLoading, isError };
}

export { useVaultData };
export type { VaultInfo }
