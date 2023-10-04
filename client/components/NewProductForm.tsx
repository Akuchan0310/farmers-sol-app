import { FarmerProvider, useContractContext } from '@/context/FarmerRole'
import { useState } from 'react';

const SupplyChainForm = () => {
    const [formData, setFormData] = useState({
        // sku: '',
        // upc: '',
        uid: 0,
        originFarmerID: '',
        originFarmerName: '',
        originFarmLatitude: '',
        originFarmLongitude: '',
        breed: '',
    });
    const { registerNewBatch, washMangoes, peelNpittMangoes, setForSale, discardItem } = useContractContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerNewBatch(formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <FarmerProvider>
            <form onSubmit={handleSubmit}>
                {/* Form input fields */}
                <div>
                    <label htmlFor="uid">UID</label>
                    <input
                        type="number"
                        id="uid"
                        name="uid"
                        value={formData.uid}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="originFarmerID">Origin Farmer ID</label>
                    <input
                        type="text"
                        id="originFarmerID"
                        name="originFarmerID"
                        value={formData.originFarmerID}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="originFarmerName">Origin Farmer Name</label>
                    <input
                        type="text"
                        id="originFarmerName"
                        name="originFarmerName"
                        value={formData.originFarmerName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="originFarmLatitude">Origin Farm Latitude</label>
                    <input
                        type="text"
                        id="originFarmLatitude"
                        name="originFarmLatitude"
                        value={formData.originFarmLatitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="originFarmLongitude">Origin Farm Longitude</label>
                    <input
                        type="text"
                        id="originFarmLongitude"
                        name="originFarmLongitude"
                        value={formData.originFarmLongitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="breed">Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </FarmerProvider>
    );
};

export default SupplyChainForm;
