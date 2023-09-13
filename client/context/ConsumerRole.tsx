import { useState, useEffect, createContext } from 'react';
import { Contract, ethers } from 'ethers';
import { addr, abi } from '../../web3/scripts/constants';

export const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) => new ethers.Contract(addr, abi, signerOrProvider);

export const ContractContext = createContext<any>(null);

export const FarmerProvider = ({ children }: any) => {
    const title = 'Mango Supply Chain';
    const [account, setAccount] = useState('');

    // Consumer role
    const purchaseItem = async (batchId: any) => {
        const provider = new ethers.JsonRpcProvider();
        const signer = await provider.getSigner();

        const chainContract = fetchContract(signer);
        try {
            const tx = await chainContract.purchaseItem(ethers.parseUnits(batchId));
            await tx.wait();
            console.log(`Batch ${batchId} has been purchased by customer ${await signer.getAddress()}`);
            // success toast
        } catch (error) {
            console.log(error, "Error updating batch status");
        }
    }
}