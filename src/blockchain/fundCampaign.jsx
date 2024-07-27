import { contractABI } from './contract/contractABI';
import { address } from './contract/address';
import { publicClient } from './clients/publicClient';
import { walletClient } from './clients/walletClient';
import { parseEther } from 'viem'
export const fundCampaign = async (index, amount) => {
  try {
    console.log('trying to fund a campaign');
    const hash = await walletClient.writeContract({
      address: address,
      abi: contractABI,
      functionName: 'donateToCampaign',
      args: [
        index
      ],
      value: amount,
      account: '0x6070c640119b7b53f67E211bD44688a11B5A7409',
    });
    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });
    
  } catch (err) {
    console.log('Error while funding a campaign transaction', err);
  }
};
