import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Router } from "wouter";

// Vite fills this from vite.config.ts `base` → "/Khaista-Boutique/"
const BASENAME = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base={BASENAME}>
      <App />
    </Router>
  </React.StrictMode>
);
