import { createPublicClient, createWalletClient, http } from "viem"
import { mainnet } from "viem/chains"

const publicRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_PUBLIC || "";
const adminRPC = process.env.NEXT_PUBLIC_TENDERLY_NODE_ACCESS_KEY_ADMIN || "";
const useTenderly = process.env.NEXT_PUBLIC_USE_TENDERLY == "yes" || false;

const publicClient = createPublicClient({
  chain: mainnet,
  transport: useTenderly ? http(`https://virtual.mainnet.rpc.tenderly.co/${publicRPC}`) : http()
});

const walletClient = createWalletClient({
  chain: mainnet,
  transport: useTenderly ? http(`https://virtual.mainnet.rpc.tenderly.co/${adminRPC}`) : http()
});

export { publicClient, walletClient }