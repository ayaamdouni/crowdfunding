import { contractABI } from './contract/contractABI';
import { address } from './contract/address';
import { publicClient } from './clients/publicClient';
import { walletClient } from './clients/walletClient';

export const createCampaign = async (owner, title, description, target, deadline, image, account
) => {
  try {
    console.log('trying to create a new campaign');
    const hash = await walletClient.writeContract({
      address: address,
      abi: contractABI,
      functionName: 'createCampaign',
      args: [
        owner, title, description, target, deadline, image
      ],
      account: account,
    });
    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });
    
  } catch (err) {
    console.log('Error while executing the finalize transaction', err);
  }
};
