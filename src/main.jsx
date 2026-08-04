import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import AppProvider from "./context/AppProvider";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <AppProvider>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#111111",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "500",
            },

            success: {
              duration: 2500,
            },

            error: {
              duration: 3500,
            },
          }}
        />

      </AppProvider>

    </BrowserRouter>

  </React.StrictMode>
);