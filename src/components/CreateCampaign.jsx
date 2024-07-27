import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton';
import FormField from './FormField';
import { createCampaign } from '../blockchain/createCampaign';


const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });
  const [Name, setName] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Goal, setGoal] = useState('');
  const [Deadline, setDeadline] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };

  const checkConnectedAccount = async () => {
    if (window.ethereum) {
      try {
      //request user to connect accounts (Metamask will prompt)
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if(accounts.length > 0) {
          setAddress(accounts[0]);
      }
    } catch {
      alert('install metamask');
    }
  }
}

useEffect(() => {
  checkConnectedAccount();
}, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(image, (isValid) => {
      if(address) {
        if(isValid) {
        console.log('this is the data: ', Name, Title, Description, Goal, Deadline, image);
      const intDeadline = Math.round(new Date(Deadline).getTime() / 1000);
      createCampaign(Name, Title, Description, Goal, intDeadline, image, address);
      console.log('here');
      } else {
        console.log('invalid image')
      }} else {
        alert('Connect your wallet');
      }
    });
    
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mt-20">
      
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a New Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={Name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={Title}
            handleChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={Description}
            handleChange={(e) => setDescription(e.target.value)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          {/* <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/> */}
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={Goal}
            handleChange={(e) => setGoal(e.target.value)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={Deadline}
            handleChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={image}
            handleChange={(e) => setImage(e.target.value)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign