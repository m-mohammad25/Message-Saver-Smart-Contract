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
          <h1>MessageSaver.sol</h1>
        </div>
        <div className="custom-buttons">
          <button onClick={handleReading} style={{ backgroundColor: "green" }}>
            Fetch Message
          </button>
          <button onClick={handleSaving} style={{ backgroundColor: "red" }}>
            Set Message
          </button>
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Set Message"
        />

        <h2 className="message">Meassage: {currentMsg}</h2>
      </div>
    </div>
  );
}

export default App;
