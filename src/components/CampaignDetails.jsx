import React, { useState, useEffect } from 'react'
import CustomButton from './CustomButton';
import FormField from './FormField';
import { author } from '../assets';
import { getCampaigns } from "../blockchain/getCampaigns";
import { useParams } from 'react-router-dom';
import { fundCampaign } from '../blockchain/fundCampaign';
import { getDonations } from '../blockchain/getDonations';
const CampaignDetails = () => {
    const [amount, setAmount] = useState(0.1);
    const [campaign, setCampaign] = useState([]);
    const [donations, setDonations] = useState([]);
    const params = useParams();
    const currentTime = Math.floor(Date.now() / 1000);

    const getCampaign = async () => {
        const campaignGet = await getCampaigns(params.id);
        setCampaign(campaignGet);
    }

    const getDonation = async () => {
        const donationsGet = await getDonations(params.id);
        console.log('the donations are: ', donationsGet);
        setDonations(donationsGet);
    }

    const fundCampaignfn = async (e) => {
        e.preventDefault();
        fundCampaign(params.id, amount);
    }
    useEffect(() => {
        getCampaign();
        getDonation();
    }, []);
    
    const Icon = ({ styles, imgUrl , isActive}) => (
        <div className={`w-[48px] h-[48px] rounded-[50px] bg-[#8c6dfd] flex justify-center items-center ${styles}`}>
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        </div>
      )


  return (
   

      <div className="flex flex-col md:flex-col mt-20 gap-[30px]">
        <div className="flex xl:flex-row items-center justify-between items-start gap-[40px]">
          <img className="w-full h-[410px] object-cover rounded-xl" src={campaign[6]}/>
          <div className='flex flex-col justify-center items-center gap-[20px]'>
            <div className='flex flex-col justify-center items-center bg-[red] text-white min-w-[200px] min-h-[50px] rounded-[10px]'>
                <div className='flex flex-col justify-center items-center text-[26px] w-full bg-[#2c2f32] rounded-t-lg min-h-[70px] font-bold'>{Math.floor((Number(campaign[4])- currentTime) / (24 * 60 * 60))}</div>
                <div className='flex flex-col justify-center items-center w-full bg-[skyblue] rounded-b-lg min-h-[50px]'>Days left</div>
            </div>
            <div className='flex flex-col justify-center items-center text-white min-w-[200px] min-h-[70px] rounded-[10px]'>
                <div className='flex flex-col justify-center items-center text-[26px] w-full bg-[#2c2f32] rounded-t-lg min-h-[70px] font-bold'>{Number(campaign[2])} ETH</div>
                <div className='flex flex-col justify-center items-center w-full bg-[skyblue] rounded-b-lg min-h-[50px]'>Goal</div>
            </div>
            <div className='flex flex-col justify-center items-center text-white min-w-[200px] min-h-[70px] rounded-[10px]'>
                <div className='flex flex-col justify-center items-center text-[26px] w-full bg-[#2c2f32] rounded-t-lg min-h-[70px] font-bold'>{Number(campaign[3])/1000000000000000000 }ETH</div>
                <div className='flex flex-col justify-center items-center w-full bg-[skyblue] rounded-b-lg min-h-[50px]'>Amount Collected</div>
            </div>
          </div>
        </div>
        <div className='flex xl:flex-row md:flex-col sm:flex-col justify-between md:items-center items-start'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                    <div className='text-white text-[20px] font-bold'>Author: </div>
                    <div className='flex items-center gap-[15px]'>
                        <Icon imgUrl={author}/>
                        <p className='text-white font-bold text-[11px]'>{campaign[0]}</p>
                    </div>
                </div>
                <div>
                    <div className='text-white text-[20px] font-bold'>Title of the campaign:</div>
                    <p className='text-white text-[10px] text-[gray]'>{campaign[1]}</p>
                </div>
                <div>
                    <div className='text-white text-[20px] font-bold'>STORY:</div>
                    <p className='text-white text-[10px] text-[gray]'>{campaign[5]}</p>
                </div>
                <div>
                    <div className='text-white text-[20px] font-bold'>Donators</div>
                    {donations[0].map((donation, index) => <p className='text-white text-[10px] text-[gray]'>{Number(donations[1][index])/1000000000000000000}ETH from:{donation}</p>)}
                </div>
            </div>
            <form className='flex justify-center gap-[15px] items-center flex-col text-white w-[400px] rounded-xl text-[10px] bg-[#2c2f32] p-2'>
                <label className='font-bold text-[15px]'>Fund the campaign</label>
                <input type='number' className='text-[15px] text-center text-white w-[350px] h-[40px] border-[1px] rounded bg-[transparent]' step={0.1} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <div className='flex flex-col gap-[8px] h-[90px] w-[350px] bg-[#13131a] rounded p-2'>
                    <p className='font-bold text-[16px]'>Fund it because you believe in it.</p>
                    <p className='text-[13px] text-[gray]'>Support this project for no reward. Just because it speaks to you.</p>
                </div>
                <CustomButton 
                btnType="submit"
                title="Fund Campaign"
                styles="bg-[#8c6dfd] w-[350px]"
                handleClick={fundCampaignfn}
                />
            </form>
        </div>
      </div>

  )
}

export default CampaignDetails