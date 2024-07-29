'use client';

import metaMorphoFactoryAbi from "../abi/metaMorphoFactory.json";
import metaMorphoAbi from "../abi/metaMorpho.json";
import ERC20Abi from "../abi/ERC20.json";
import { useReadContract, useReadContracts } from "wagmi";
import { useDebounce } from "use-debounce";
import { publicClient } from '../app/clients'
import { getContract } from "viem";
import { useEffect, useState } from "react";

const metaMorphoContract = {
  address: '0x38989bba00bdf8181f4082995b3deae96163ac5d',
  abi: metaMorphoAbi,
} as const
const ERC20Contract = {
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  abi: ERC20Abi,
} as const

interface VaultParams {
    readonly addressVault: string,
    readonly addressUser: `0x${string}` | undefined,
}

const useVaultData = ({addressVault, addressUser}:VaultParams): any => {
    const [data, setData] = useState(false);

    useEffect(()=>{
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
            /*  if(vaultAsset){
                const asset = getContract({
                    address: vaultAsset,
                    abi: ERC20Abi,
                    client: publicClient,
                  });
              }
      
              const assetSymbol = await asset.symbol();
              const assetDecimals = await asset.decimals();
*/
            const userShares = await vault.read.balanceOf([addressUser]); // gives the shares user balance
           // const userAssets = await vault.read.convertToAssets(userShares);

            const userMaxRedeem = await vault.read.maxRedeem([addressUser]);
           // const userMaxWithdraw = await vault.read.convertToAssets(userMaxRedeem);
           console.log(vaultName)
           console.log(vaultSymbol)
           console.log(vaultDecimals)
           console.log(vaultAsset)
           console.log(userShares)
           console.log(userMaxRedeem)
            } catch (ex) {
              console.log(ex);
            }
          };
          fetchData();
    },[addressUser, addressVault])

    return data;
}
 
export { useVaultData };
