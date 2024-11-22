import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [counter, setCounter] = useState(0);

  // Manually specify the RPC URL to avoid issues with the cluster API
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect()
        .then((response) => {
          console.log('Wallet connected:', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
        })
        .catch((error) => {
          console.error('Error connecting wallet:', error);
        });
    }
  }, []);
  

  const incrementCounter = async () => {
    if (!walletAddress) return;

    try {
      // Your deployed program ID
      const programId = new PublicKey("BF1ep1qvESMQk9WRXXbBTRHpUYBVfvhNXMdphVBkxVpr");

      // Fetch the latest blockhash from the connection (try using getLatestBlockhash instead)
      const { blockhash } = await connection.getLatestBlockhash();
      
      console.log('Fetched Blockhash:', blockhash);

      // Create a transaction with the fetched blockhash
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: walletAddress,
      });

      // Define the instruction to increment the counter
      const incrementInstruction = new TransactionInstruction({
        keys: [
          {
            pubkey: new PublicKey(walletAddress),
            isSigner: true,
            isWritable: true,
          },
        ],
        programId,
        data: new Uint8Array([1]), // Data to increment the counter
      });

      // Add the instruction to the transaction
      transaction.add(incrementInstruction);

      // Sign and send the transaction using Phantom wallet
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      console.log("Transaction sent with signature:", signature);

      // Wait for transaction confirmation
      await connection.confirmTransaction(signature);
      setCounter(counter + 1); // Update the frontend counter after the transaction is confirmed
    } catch (error) {
      console.error("Error interacting with the contract:", error);
    }
  };

  return (
    <div>
      <h1>Solana Smart Contract Interaction</h1>
      <p>Wallet Address: <strong>{walletAddress}</strong></p>
      <button onClick={incrementCounter}>Increment Counter</button>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default App;
