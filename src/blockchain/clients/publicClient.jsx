import {custom, createPublicClient} from 'viem';
import {etherlinkTestnet} from 'viem/chains';

export const publicClient = createPublicClient({
  chain: etherlinkTestnet,
  transport: custom(window.ethereum),
});