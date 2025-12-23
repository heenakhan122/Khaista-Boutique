import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Router } from "wouter";

// Vite injects this from vite.config.ts
const BASENAME = import.meta.env.BASE_URL; // "/Khaista-Boutique/"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base={BASENAME}>
      <App />
    </Router>
  </React.StrictMode>
);
