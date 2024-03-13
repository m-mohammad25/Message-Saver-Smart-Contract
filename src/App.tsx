import React from "react";
import { useState } from "react";
import { readMsg, saveMsg } from "./helpers";

function App(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [currentMsg, setCurrentMsg] = useState<string>("");

  async function handleReading(): Promise<void> {
    const msg = await readMsg();
    setCurrentMsg(msg);
  }

  async function handleSaving() {
    await saveMsg(message);
    setMessage("");
    handleReading();
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1>Greeter.sol</h1>
          <h3>Full stack dapp using ReactJS and Hardhat</h3>
        </div>
        <div className="custom-buttons">
          <button onClick={handleReading} style={{ backgroundColor: "green" }}>
            Fetch Greeting
          </button>
          <button onClick={handleSaving} style={{ backgroundColor: "red" }}>
            Set Greeting
          </button>
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Set Greeting Message"
        />

        <h2 className="greeting">Greeting: {currentMsg}</h2>
      </div>
    </div>
  );
}

export default App;
