import { SupplyChainProvider, useContractContext } from '@/helpers/context';

export default function Home() {

    const { title, account, addFarmer, addRetailer, addConsumer, fetchProductDetails, fetchOriginDidi, connectWallet } = useContractContext()

    return (
        <main>
            <button onClick={addFarmer}>
                Add farmer
            </button>
        </main>
    )
}