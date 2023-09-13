import { ethers, BigNumberish } from "ethers";

declare global {
    interface Window {
        ethereum?: any,
    }
}

export function toGwei(gasPrice: string): string {
    return ethers.formatUnits(gasPrice, 'gwei');
}

export function toWei(val: string, decimal: number = 18): bigint {
    return ethers.parseUnits(val, decimal);
}

export function fromWei(val: string, decimal: number = 18): string {
    return ethers.formatUnits(val, decimal);
}

export function toBN(value: BigNumberish): bigint {
    return ethers.toBigInt(value);
}

export function handleChainOrAccChange() {
    window.location.reload();
}