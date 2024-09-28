import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop() {

    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdropToUser() {
        if (wallet.publicKey) {
            const amount = document.getElementById("amountBox").value;
            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
            alert("Airdropped SOL");
        } else {
            alert("No wallet connected!");
        }
    }

    return (
        <div>
            <p>
                Hi Mr.{" "}
                {wallet.publicKey ? wallet.publicKey.toString() : "No wallet connected"}
            </p>
            <input type="text" id="amountBox" placeholder="amount" />
            <button onClick={sendAirdropToUser}>Send Airdrop</button>
        </div>
    );
}

export default Airdrop;
