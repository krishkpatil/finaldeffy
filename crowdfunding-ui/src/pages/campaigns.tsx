import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
import './App.css';
import CompaignsView from '../views/campaigns-view';
import WalletWrapper from '../wrappers/wallet-wrapper';
import Navbar from '../components/Navbar'

interface AppProps {

}

// const network = 'http://127.0.0.1:8899';
const network = clusterApiUrl(WalletAdapterNetwork.Devnet);

const App: React.FC<AppProps> = () => {
    return (
        <WalletWrapper network={network}>
            <CompaignsView network={network}/>
        </WalletWrapper>
    );
}

export default App;