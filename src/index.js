import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ForecastProvider } from "./utils/ForecastContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrap App in Provider to share weather data globally */}
    <ForecastProvider>
      <App />
    </ForecastProvider>
  </React.StrictMode>
);
