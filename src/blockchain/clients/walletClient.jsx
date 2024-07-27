import {createWalletClient, custom} from 'viem';
import {etherlinkTestnet} from 'viem/chains';

export const walletClient = createWalletClient({
  chain: etherlinkTestnet,
  transport: custom(window.ethereum),
});
