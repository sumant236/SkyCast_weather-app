import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ForecastProvider } from "./utils/ForecastContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ForecastProvider>
      <App />
    </ForecastProvider>
  </React.StrictMode>
);
