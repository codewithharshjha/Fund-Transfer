"use client";
import React, { createContext, useEffect, useState } from 'react';
import { contractABI, contractAddress } from "../utils/constants";
import { ethers } from 'ethers';

export const TransactionContext = createContext();

const getEthereumContract = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        try {
            // Create a Web3Provider from window.ethereum
            const provider = new ethers.BrowserProvider(window.ethereum);
            
            // Get the signer (await it properly)
            const signer = await provider.getSigner();
            
            // Create contract with signer
            const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
            
            console.log("Contract initialized");
            return transactionContract;
        } catch (error) {
            console.error("Error getting Ethereum contract:", error);
            return null;
        }
    } else {
        console.log("Ethereum not available.");
        return null;
    }
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (typeof window !== 'undefined' && !window.ethereum) {
                return alert("Please install MetaMask");
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Account found", accounts);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log("Error checking wallet:", error);
            alert("Error checking wallet. Please try again.");
        }
    };

    const sendTransaction = async () => {
        try {
            if (typeof window !== 'undefined' && window.ethereum) {
                const { addressTo, amount, keyword, message } = formData;
                
                // Get the contract (await it since it's an async function)
                const transactionsContract = await getEthereumContract();
                if (!transactionsContract) return;

                // Convert amount to ether and parse it
                const parsedAmount = ethers.parseEther(amount);

                setIsLoading(true);
                
                // IMPORTANT: First do a direct ETH transfer to ensure funds are actually transferred
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                
                // Create transaction parameters for direct ETH transfer
                const tx = await signer.sendTransaction({
                    to: addressTo,
                    value: parsedAmount,
                });
                
                console.log(`ETH transfer submitted: ${tx.hash}`);
                
                // Wait for the ETH transfer to be mined
                await tx.wait();
                console.log(`ETH transfer confirmed: ${tx.hash}`);
                
                // After ETH transfer is confirmed, call the contract method to record the transaction
                const contractTx = await transactionsContract.addToBlockchain(
                    addressTo,
                    parsedAmount,
                    message,
                    keyword
                );
                
                console.log(`Contract transaction submitted: ${contractTx.hash}`);
                
                // Wait for contract transaction to be mined
                await contractTx.wait();
                console.log(`Contract transaction confirmed: ${contractTx.hash}`);
                
                setIsLoading(false);

                // Get updated transaction count
                const transactionsCount = await transactionsContract.getTransactionCount();
                setTransactionCount(Number(transactionsCount));

                if (typeof window !== 'undefined') {
                    localStorage.setItem("transactionCount", Number(transactionsCount).toString());
                }
            } else {
                console.log("Ethereum object is not available.");
                alert("No Ethereum object found. Please install MetaMask.");
            }
        } catch (error) {
            console.log("Error sending transaction:", error);
            console.error(error);
            alert("Error sending transaction. Please try again.");
            setIsLoading(false);
        }
    };

    const connectWallet = async () => {
        try {
            if (typeof window !== 'undefined' && !window.ethereum) {
                console.log("Ethereum not found, please install MetaMask");
                return alert("Please install MetaMask");
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error connecting wallet:", error);
            alert("Error connecting wallet. Please try again.");
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkIfWalletIsConnected();
            // Get transactionCount from localStorage if available
            const savedTransactionCount = localStorage.getItem("transactionCount");
            if (savedTransactionCount) {
                setTransactionCount(parseInt(savedTransactionCount));
            }
        }
    }, []);

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            currentAccount, 
            formData, 
            setFormData, 
            handleChange, 
            sendTransaction, 
            isLoading 
        }}>
            {children}
        </TransactionContext.Provider>
    );
};