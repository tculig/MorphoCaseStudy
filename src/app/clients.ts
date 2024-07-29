import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"


const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_MAINNET || "";

const publicClient = createPublicClient({ 
    chain: mainnet, 
    transport: http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`) 
  }) 

export { publicClient }