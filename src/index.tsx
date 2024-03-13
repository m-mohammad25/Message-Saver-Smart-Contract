import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const container = document.getElementById("root") as Element;
const root: ReactDOM.Root = ReactDOM.createRoot(container);
root.render(<App />);
