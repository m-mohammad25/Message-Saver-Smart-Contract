import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import MessageSaver from "./artifacts/contracts/MessageSaver.sol/MessageSaver.json";

// contract address on localhost node 0x5fbdb2315678afecb367f032d93f642f64180aa3
const messageSaverAddress = "0xb51a6708436F5131b0Bfc12d8717b8FDea2CdDbe"; // contract address on sepolia network

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Fetches the current message store
export async function readMsg(): Promise<string> {
  if (typeof window.ethereum === "undefined") return "";
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(
    messageSaverAddress,
    MessageSaver.abi,
    provider
  );
  let data = "";
  try {
    data = await contract.readMsg();
    console.log("data: ", data);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    return data;
  }
}

// Sets the greeting from input text box
export async function saveMsg(_msg: string) {
  if (!_msg) return;

  // If MetaMask exists
  if (typeof window.ethereum == "undefined") return;
  await requestAccount();

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  // Create contract with signer

  const contract = new ethers.Contract(
    messageSaverAddress,
    MessageSaver.abi,
    signer
  );
  const transaction = await contract.saveMsg(_msg);

  await transaction.wait();
}
