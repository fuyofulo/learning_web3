import './App.css';
import { config } from '../config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useBalance, useDisconnect, useConnect, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()


function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector/><br /><br />
        <input placeholder='Address'></input><br /><br />
        <button>Send 0.1 ETH</button>
        <MyAddress/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function MyAddress () {
  const { address } = useAccount()
    const { disconnect } = useDisconnect()

    const balance = useBalance({
      address
    })
  
    return (
      <div>
        {address && <div>
          Your address - {address}<br />
          Your balance - {balance.data?.formatted}<br />
        </div>}
        
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
}

function WalletConnector () {

  const { connectors, connect } = useConnect()
  console.log(connectors);

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export default App
