import { contractABI } from './contract/contractABI';
import { address } from './contract/address';
import { publicClient } from './clients/publicClient';

export const getNumberCampaigns = async () => {
  try {
    console.log('getting the number of campaigns....');
    const data = await publicClient
      .readContract({
        address: address,
        abi: contractABI,
        functionName: 'numberOfCampaigns',
      })
      .catch(err => console.log('erreur', err));
    return Number(data);
  } catch (error) {
    console.error('error in returning number of campaigns', error);
    throw error;
  }
};
