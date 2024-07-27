import React, { useState, useEffect } from "react";
import { blockchain, search } from "../assets";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    const Icon = ({ imgUrl, styles }) => (
        <div className={`w-[30px] h-40px] flex justify-center items-center ${styles}`}>
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        </div>
      )
      const [address, setAddress] = useState('');
      const connectToMetamask = () => {
            // Asking if metamask is already present or not
            if(address) {
                setAddress('');
            } else {
                if (window.ethereum) {
                // res[0] for fetching a first wallet
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((res) =>
                        setAddress(res[0])
                    );
            } else {
                alert("install metamask extension!!");
            }
            }
            
      }
      useEffect(()=> {
        getConnectedWallet();
        addWalletListener();
    });
    const addWalletListener = async() => {
        //check metamask is installed
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) =>{
                setAddress('');
            })
        } else {
            console.log("Please install Metamask");
        }
    }
    const getConnectedWallet = async() => {
      //check metamask is installed
      if (window.ethereum) {
            try {
            //request user to connect accounts (Metamask will prompt)
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if(accounts.length > 0) {
                setAddress(accounts[0]);
            } else {
                console.log('There are no connected Accounts !');
            }
            //show the first connected account in the react page
            } catch (err) {
                console.log(err.message);
            }
      } else {
        alert('Please download metamask');
      }
    }
    return(
        <div className="flex justify-center">
            <div className=" flex-auto ">
                
                <form className="flex items-center max-w-sm">   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-[#2c2f32] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Campaign..." required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Icon imgUrl={search}/>
                        <span className="sr-only">Search</span>
                    </button>
                </form>

            </div>
                <NavLink
                to={address ? '/addCampaign' : '#'}>
                <button className="flex justify-center items-center w-[200px] max-w-sm dark:bg-[#2c2f32] rounded-lg text-gray-400 border border-gray-600 hover:bg-gray-800" type="submit" onClick={connectToMetamask}>
                    <div>{address ? 'Add new Campaign': 'Connect your wallet'}</div> <Icon styles={'w-[45px] h-45px]'} imgUrl={blockchain}/>
                </button>
                </NavLink>
            
            
            
        </div>
    )
}
export default Navbar