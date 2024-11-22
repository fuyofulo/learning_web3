import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import './App.css'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

async function getBalance () {
  const res = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})
  console.log(res);
}

function App() {
  

  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  )
}

export default App
