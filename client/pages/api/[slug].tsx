
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Product } from '@/components/index'
import { FarmerProvider, useContractContext } from '@/context/FarmerRole'

export default function Farmer() {
    const { farmerID } = useParams();


}