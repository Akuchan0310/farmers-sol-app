import { useState, useEffect, createContext } from 'react';
import { Contract, ethers } from 'ethers';
import { addr, abi } from '../../web3/scripts/constants';

export const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) => new ethers.Contract(addr, abi, signerOrProvider);

export const ContractContext = createContext<any>(null);

export const SupplyChainProvider = ({ children }: any) => {
    const title = 'Mango Supply Chain';
    const [account, setAccount] = useState('');

    // Add new farmer
    const addFarmer = async (props: any) => {
        const { address } = props;
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const farmerContract = fetchContract(signer);
        
        try {
            const tx = await farmerContract.addFarmer(address);
            await tx.wait();
            console.log('Welcome to FarmDidi, successfully registered farmer!');
        } catch (error) {
            console.log(error, 'Unable to create new farmer');
            // error toast
        }
    }

    // Add new Retailer
    const addRetailer = async (props: any) => {
        const { address } = props;
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const RetailerContract = fetchContract(signer);
        
        try {
            const tx = await RetailerContract.addRetailer(address);
            await tx.wait();
            console.log('Welcome to FarmDidi, successfully registered Retailer!');
        } catch (error) {
            console.log(error, 'Unable to create new Retailer');
            // error toast
        }
    }

    // Add new Consumer
    const addConsumer = async (props: any) => {
        const { address } = props;
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const ConsumerContract = fetchContract(signer);
        
        try {
            const tx = await ConsumerContract.addConsumer(address);
            await tx.wait();
            console.log('Welcome to FarmDidi, successfully registered Consumer!');
        } catch (error) {
            console.log(error, 'Unable to create new Consumer');
            // error toast
        }
    }
}