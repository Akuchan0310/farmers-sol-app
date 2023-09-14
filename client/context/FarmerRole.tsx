import { useState, useEffect, createContext, useContext } from 'react';
import { Contract, ethers } from 'ethers';
import { addr, abi } from '../../web3/scripts/constants';

export const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) => new ethers.Contract(addr, abi, signerOrProvider);

export const ContractContext = createContext<any>(null);

export const FarmerProvider = ({ children }: any) => {
    const title = 'Mango Supply Chain';
    const [account, setAccount] = useState('');

    // Farmer role
    const registerNewBatch = async (newBatch: any) => {
        const { _uid, _originFarmerID, _originFarmerName, _originFarmLatitude, _originFarmLongitude, _breed } = newBatch;
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);

        try {
            const tx = await chainContract.harvestMangoes(ethers.parseUnits(_uid), _originFarmerID, _originFarmerName, _originFarmLatitude, _originFarmLongitude, _breed);
            await tx.wait();
            console.log('Congratulations for your new harvest! Registered succesfully!');
        } catch (error) {
            console.log(error, "Error registering new batch");
            // error toast
        }
    }

    const washMangoes = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.washMangoes(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been marked washed`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }

    const peelNpittMangoes = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.peelNpittMangoes(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been marked peeled n pitted`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }

    const setForSale = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.setForSale(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been marked peeled n pitted`);
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
            registerNewBatch,
            washMangoes,
            peelNpittMangoes,
            setForSale,
            discardItem
         }}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContractContext = () => useContext(ContractContext);