import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { handleChainOrAccChange } from '@/helpers/utils'
import { SupplyChainProvider } from '@/helpers/context';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // listen for account changes
    window.ethereum.on('accountsChanged', handleChainOrAccChange);
    // listen for chain change
    window.ethereum.on('chainChanged', handleChainOrAccChange);
  }, [])
  return (
    <SupplyChainProvider>
      <Component {...pageProps} />
    </SupplyChainProvider>
  )
}
