import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// localStorage.setItem(
//   "token",
//   "4|PmwNKCSBid3yShgoaTfeumMrJPrKd7zQZipQbn670367218b"
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);