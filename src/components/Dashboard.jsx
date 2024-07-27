import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Campaign from "./Campaign";
import CustomButton from "./CustomButton";
import { getCampaigns } from "../blockchain/getCampaigns";
import { getNumberCampaigns } from "../blockchain/getNumberCampaigns";

const Dashboard = () => {
    const [campaignsMap, setCampaigns] = useState([]);
    const [deadline, setDeadline] = useState();

    const calculateRemainingDays = (deadline) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainDays = Math.floor((Number(deadline) - currentTime) / (24 * 60 * 60));
        return remainDays;
    };
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
            {campaignsMap.length !== 0 ? campaignsMap.map((campaign, index) => (
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
            )): <div className="text-[gray] font-bold m-auto">There are no campaigns yet</div>}
        </div>
    );
}

export default Dashboard;
