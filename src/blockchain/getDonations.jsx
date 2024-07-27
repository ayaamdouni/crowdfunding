import { contractABI } from './contract/contractABI';
import { address } from './contract/address';
import { publicClient } from './clients/publicClient';

export const getDonations = async (index) => {
  try {
    console.log('getting donations....');
    const data = await publicClient
      .readContract({
        address: address,
        abi: contractABI,
        functionName: 'getDonations',
        args: [index],
      })
      .catch(err => console.log('erreur', err));
      console.log('donations: ', data);
    return data;
  } catch (error) {
    console.error('error in returning donations', error);
    throw error;
  }
};
