import '@/styles/globals.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { NextUIProvider, createTheme} from '@nextui-org/react';
import WalletWrapper from '/wrappers/wallet-wrapper';

const network = clusterApiUrl(WalletAdapterNetwork.Devnet);
const darkTheme = createTheme({type: "dark"});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletWrapper network={network}> 
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </WalletWrapper>
  )
}

export default MyApp