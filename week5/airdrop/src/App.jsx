import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletConnectButton, WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Airdrop';

const App = () => {

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/PIc1wmnH_QhOEwH3vtddMUwcYluAEHMU"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
        <WalletMultiButton /> <br />
          <div>hello there</div> <br />
          <Airdrop ></Airdrop> <br />
          <WalletDisconnectButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
