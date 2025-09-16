// context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("watchShopCart")) || [];
    setCart(savedCart);
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("watchShopCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
