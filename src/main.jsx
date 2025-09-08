

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Backend URL global export ke liye define kar diya
export const BACKEND_URL = "https://greengrocerbackend2025.onrender.com";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
