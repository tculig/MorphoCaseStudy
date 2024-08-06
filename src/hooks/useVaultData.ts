'use client';

import metaMorphoAbi from "../abi/metaMorpho";
import ERC20Abi from "../abi/ERC20";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";
import { roundToDecimals } from "@/util";
import { useReadContracts } from 'wagmi';
import { Oldenburg } from "next/font/google";

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
  isFetching: boolean,
  isError: boolean,
}


const useVaultData = ({ addressVault, addressUser, enabled }: VaultParams): VaultResult => {
  const [result, setResult] = useState<VaultInfo>({});
  const morphoContract = {
    address: addressVault as `0x${string}`,
    abi: metaMorphoAbi,
  } as const;

  const { data: dataCall1, isError: isErrorCall1, isFetching: isFetchingCall1 } = useReadContracts({
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
        args: [addressUser!]
      },
      {
        ...morphoContract,
        functionName: 'maxRedeem',
        args: [addressUser!]
      }
    ],
    query: {
      enabled: !!addressUser
    }
  });

  useEffect(() => {
    setResult((oldResult) => ({
      ...oldResult,
      dataCall1
    }))
  }, [dataCall1])

  const { data: dataCall2, isError: isErrorCall2, isFetching: isFetchingCall2 } = useReadContracts({
    contracts: [
      {
        ...morphoContract,
        functionName: 'convertToAssets',
        args: [result.userShares!]
      },
      {
        ...morphoContract,
        functionName: 'convertToAssets',
        args: [result.userMaxRedeem!]
      }
    ],
    query: {
      enabled: !!(result.userShares && result.userMaxRedeem)
    }
  });

  useEffect(() => {
    setResult((oldResult) => ({
      ...oldResult,
      dataCall2
    }))
  }, [dataCall2])

  const assetContract = {
    address: result.vaultAsset! as `0x${string}`,
    abi: ERC20Abi,
  } as const;

  const { data: dataCall3, isError: isErrorCall3, isFetching: isFetchingCall3 } = useReadContracts({
    contracts: [
      {
        ...assetContract,
        functionName: 'symbol',
      },
      {
        ...assetContract,
        functionName: 'decimals',
      }
    ],
    query: {
      enabled: !!result.vaultAsset
    }
  });

  useEffect(() => {
    setResult((oldResult) => ({
      ...oldResult,
      dataCall3,    
    }))
  }, [dataCall3]);

  useEffect(() => {
    setResult((oldResult) => ({
      ...oldResult,
      formattedShares : (result.userShares && result.vaultDecimals) ? roundToDecimals(formatUnits(result.userShares, result.vaultDecimals), 2).toFixed(2) : undefined,
      formattedAssets : (result.userAssets && result.assetDecimals) ? roundToDecimals(formatUnits(result.userAssets, result.assetDecimals), 2).toFixed(2) : undefined
    }))
  }, [result.assetDecimals, result.userAssets, result.userShares, result.vaultDecimals]);

  

  useEffect(() => {
    if (!enabled) setResult({});
  }, [enabled]);

  return { data: result, isFetching: isFetchingCall1 || isFetchingCall2 || isFetchingCall3, isError: isErrorCall1 || isErrorCall2 || isErrorCall3 };
}

export { useVaultData };
export type { VaultInfo }
