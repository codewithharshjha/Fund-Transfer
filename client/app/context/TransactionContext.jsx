"use client"
import React, { createContext, useEffect, useState } from 'react'


import {contractABI,contractAddress} from "../utils/constants"
import { ethers } from 'ethers'
export const TransactionContext=createContext()
const {ethereum}=window
console.log("this is ethereum",ethereum)
const getEthereumContract=()=>{
const provider=new ethers.BrowserProvider(ethereum)
const signer=provider.getSigner()
const transactionContract=new ethers.Contract(contractAddress,contractABI,signer)
console.log({
    provider,signer,transactionContract
})
}
export const TransactionProvider=({children})=>{
    const [currentAccount,setCurrenttAccount]=useState("")

    const[formData,setFormData]=useState({
        addressTo:"",
        amount:"",
        keyword:"",
        message:""

    })
    const[isLoading,setIsLoading]=useState(false)
    const[transactionCount,setTransactionCount]=useState(localStorage.getItem("transactionCount"))
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))

    }
    const checkIfWalletIsConnected=async()=>{
        try {
            if(!ethereum)
                return alert("please install metamask")
            const accounts=await ethereum.request({method:"eth_accounts"})
            if(accounts.length){
                setCurrenttAccount(accounts[0])
                console.log("account found",accounts)
            }
            else{
                console.log("no account found")
            }
        } catch (error) {
            throw new Error("no etherum object") 
        }
       
 
       
      
    }
    const sendTransaction = async () => {
        try {
            
          if (ethereum) {
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
    
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });
    
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
    
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
    
            const transactionsCount = await transactionsContract.getTransactionCount();
    
            setTransactionCount(transactionsCount.toNumber());
            window.location.reload();
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    
    const connectwallet=async()=>{
        try {
            if(!ethereum){
                console.log("yha etherum mai fs gyai")

                return alert("please install metamask")
            }
            console.log("yha tk phuche")
            const accounts=await ethereum.request({method:"eth_requestAccounts"})
           setCurrenttAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("no etherum object")
        }
    }
      useEffect(()=>{
            checkIfWalletIsConnected()
        },[])
    return (

        <TransactionContext.Provider value={{connectWallet:connectwallet,currentAccount ,formData,setFormData,handleChange,sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}