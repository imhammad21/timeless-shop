import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/mainLayout";
import Home from "./pages/Home";
import Products from "./pages/products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar"; 

export default function App() {
  // const savedCart = JSON.parse(localStorage.getItem("watchShopCart")) || [];

  // const [cart, setCart] = useState([]);
  const [cart, setCart] = useState(() => {
  return JSON.parse(localStorage.getItem("watchShopCart")) || [];
});


  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("watchShopCart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("watchShopCart", JSON.stringify(cart));
  }, [cart]);
  

  // Add item
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Routes>
      <Route
        element={<MainLayout cart={cart} setCart={setCart} />}
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products addToCart={addToCart} cart={cart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
