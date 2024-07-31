import { createPublicClient, createWalletClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains"

const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_MAINNET || "";
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY || "";

const publicClient = createPublicClient({ 
    chain: mainnet, 
    transport: http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`) 
  });

  const walletClient = createWalletClient({ 
    account: privateKeyToAccount(privateKey as `0x${string}`),
    chain: mainnet, 
    transport: http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`) 
  });  

export { publicClient, walletClient }