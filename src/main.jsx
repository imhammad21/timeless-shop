import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ✅ use HashRouter for GitHub Pages
import App from "./App";
import { CartProvider } from "./context/CartContext"; 
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <BrowserRouter basename={import.meta.env.BASE_URL}></BrowserRouter>
    <HashRouter >
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
