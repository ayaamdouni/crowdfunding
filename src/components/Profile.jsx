import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Campaign from "./Campaign";
import { getCampaigns } from "../blockchain/getCampaigns";
import { getNumberCampaigns } from "../blockchain/getNumberCampaigns";
import CustomButton from "./CustomButton";


const Profile = () => {
    const [campaignsMap, setCampaigns] = useState([]);
    const [account, setAccount] = useState('');

    const calculateRemainingDays = (deadline) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainDays = Math.floor((Number(deadline) - currentTime) / (24 * 60 * 60));
        return remainDays;
    };

    const checkConnectedAccount = async () => {
        if (window.ethereum) {
          try {
          //request user to connect accounts (Metamask will prompt)
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if(accounts.length > 0) {
              setAccount(accounts[0]);
          }
        } catch {
          alert('install metamask');
        }
      }
    }
    
    useEffect(() => {
      checkConnectedAccount();
    }, []);
    
    const getAll = async () => {
        const NumberCampaigns = await getNumberCampaigns();
        console.log('Number of campaigns: ', NumberCampaigns);
        const campaignsArray = [];
        for (let i = 0; i < NumberCampaigns; i++) {
            console.log(`getting campaign ${i}`);
            const campaign = await getCampaigns(i);
            campaignsArray.push(campaign);
            console.log(`Campaign ${i}: `, campaign);
        }
        setCampaigns(campaignsArray);
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="flex flex-wrap justify-between gap-4 mt-20">
            {campaignsMap.length !== 0 ? campaignsMap.filter((campaign) => campaign[0].toLowerCase() === account.toLowerCase()).map((campaign, index) => (
                <NavLink key={index} 
                to={`/campaign/${index}`}
                >
                    <Campaign 
                    owner={campaign[0].substr(0,6)+'...'+campaign[0].substr(-6, 6)} 
                    title= {campaign[1]}
                    description={campaign[5]} 
                    target={Number(campaign[2])} 
                    deadline={calculateRemainingDays(Number(campaign[4]))}
                    amountCollected={campaign[3]} 
                    image={campaign[6]}/>
                </NavLink>
            )): <div className="text-[gray] font-bold m-auto">There are no campaigns yet for {account} {campaignsMap}</div>}
           
        </div>
    );
}
export default Profile