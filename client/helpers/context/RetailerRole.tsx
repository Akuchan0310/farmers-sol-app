import { useState, useEffect, createContext, useContext } from 'react';
import { Contract, ethers } from 'ethers';
import { addr, abi } from '../../../web3/scripts/constants';

export const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) => new ethers.Contract(addr, abi, signerOrProvider);

export const ContractContext = createContext<any>(null);

export const RetailerProvider = ({ children }: any) => {
    const title = 'Mango Supply Chain';
    const [account, setAccount] = useState('');

    // Retailer role
    const buyItem = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.buyItem(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been bought by retailer`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }

    const processItem = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.processItem(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been processed`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }

    const sellProduct = async (batchId: any, price: any, expDate: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.sellProduct(ethers.parseUnits(batchId), ethers.parseUnits(price), expDate.toNumber());
            await tx.wait();
            console.log(`Batch ${batchId} has been marked for sale`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }

    const discardItem = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.disacardItem(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been discarded`);
            // success toast
        } catch (error) {
            console.log(error, "Error discarding item");
        }
    }

    return (
        <ContractContext.Provider 
         value={{
            buyItem,
            processItem,
            sellProduct,
            discardItem
         }}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContractContext = () => useContext(ContractContext);