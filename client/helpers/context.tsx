import { useState, useEffect, createContext, useContext } from 'react';
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

    // check if wallet connected
    const checkWalletConnection = async () => {
        try {
            if (!window.ethereum) {
                console.error('Install Metamask to proceed');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', });
            if (accounts.length) {
                setAccount(accounts[0]);
            } else {
                console.log('No accounts found');
            }
        } catch (err) {
            console.log('Error connecting to wallet')
        }
    }

    // connect to Metamask function
    const connectWallet = async (onConnectDo: (address: string) => any) => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                // Request user account access
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then((accounts: any) => {
                        console.log(`Connected to wallet @${accounts[0]}`);
                        onConnectDo(accounts[0]);
                    })
                    .catch((error: any) => {
                        console.error('No account found || Error:', error);
                    });
            }
        } catch (error) {
            console.log('Error connecting to Metamask | Wallet not fetched');
        }
    };

    useEffect(() => { checkWalletConnection(); }
        , []);

    return (
        <ContractContext.Provider
            value={{
                title,
                account,
                addFarmer,
                addRetailer,
                addConsumer,
                connectWallet,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}


export const useContractContext = () => useContext(ContractContext);