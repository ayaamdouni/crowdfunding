import { contractABI } from './contract/contractABI';
import { address } from './contract/address';
import { publicClient } from './clients/publicClient';

export const getCampaigns = async (i) => {
  try {
    console.log('getting ....');
    const data = await publicClient
      .readContract({
        address: address,
        abi: contractABI,
        functionName: 'campaigns',
        args: [i],
      })
      .catch(err => console.log('erreur', err));
    return data;
  } catch (error) {
    console.error('error in returning campaigns', error);
    throw error;
  }
};
