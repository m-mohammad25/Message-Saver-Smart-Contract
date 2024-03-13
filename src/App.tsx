import React from "react";
import { ethers } from "ethers";
import MessageSaver from "./artifacts/contracts/MessageSaver.sol/MessageSaver.json";
import { useState } from "react";

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const messageSaverAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
function App(): JSX.Element {
  const [message, setMessage] = useState("");
  const [currentMsg, setCurrentMsg] = useState("");

  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Fetches the current message store
  async function readMsg() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        messageSaverAddress,
        MessageSaver.abi,
        provider
      );
      try {
        const data = await contract.readMsg();
        console.log("data: ", data);
        setCurrentMsg(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Sets the greeting from input text box
  async function saveMsg() {
    if (!message) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      // Create contract with signer

      const contract = new ethers.Contract(
        messageSaverAddress,
        MessageSaver.abi,
        signer
      );
      const transaction = await contract.saveMsg(message);

      setMessage("");
      await transaction.wait();
      readMsg();
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>Greeter.sol</h1>
          <h3>Full stack dapp using ReactJS and Hardhat</h3>
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          <button onClick={readMsg} style={{ backgroundColor: "green" }}>
            Fetch Greeting
          </button>
          <button onClick={saveMsg} style={{ backgroundColor: "red" }}>
            Set Greeting
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Set Greeting Message"
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="greeting">Greeting: {currentMsg}</h2>
      </div>
    </div>
  );
}

export default App;
