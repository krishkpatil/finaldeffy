import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
import CampaignsView from '../views/CampaignsView';
import WalletWrapper from '../wrappers/wallet-wrapper';

const network = clusterApiUrl(WalletAdapterNetwork.Devnet);

function Campaigns() {
    return (
        <CampaignsView network={network}/>
    );
}

export default Campaigns;