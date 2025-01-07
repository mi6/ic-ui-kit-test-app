import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IcTheme } from "@ukic/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IcTheme theme="light">
      <App />
    </IcTheme>
  </React.StrictMode>,
);
