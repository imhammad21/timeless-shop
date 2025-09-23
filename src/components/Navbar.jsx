import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaTimes } from "react-icons/fa";

export default function Navbar({ cart, setCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authMessage, setAuthMessage] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    number: "",
    address: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("loggedInUser")
  );

  const navigate = useNavigate();

  // ✅ Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === email)) {
      setAuthMessage("❌ Account already exists with this email.");
      return;
    }

    if (password !== confirmPassword) {
      setAuthMessage("❌ Passwords do not match.");
      return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    setAuthMessage("");
  };

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
      setIsLoggedIn(true);
      setIsAuthOpen(false);
      setAuthMessage("");
    } else {
      setAuthMessage("❌ Invalid email or password.");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setIsCartOpen(false);
  };

  // ✅ Handle Confirm Order (redirect WhatsApp)
  const handleConfirmOrder = () => {
    const savedCart = JSON.parse(localStorage.getItem("watchShopCart")) || [];
    if (savedCart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const total = savedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = `🛒 *New Order*\n\n👤 Name: ${orderDetails.name}\n📞 Phone: ${orderDetails.number}\n📧 Email: ${orderDetails.email}\n🏠 Address: ${orderDetails.address}\n\n📦 Items:\n${savedCart
  .map(
    (item) =>
      `${item.name} x${item.quantity} = $${item.price * item.quantity}`
  )
  .join("\n")}\n\n💰 Total: $${total.toFixed(2)}`;

const whatsappUrl = `https://wa.me/923113436386?text=${encodeURIComponent(
  message
)}`;

window.open(whatsappUrl, "_blank");


    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Timeless
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-400">
            Products
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>

      <div className="flex items-center space-x-4">
  {/* Cart with Badge */}

<button
  onClick={() => setIsCartOpen(true)}
  className="relative hover:text-gray-400"
>
  <FaShoppingCart size={20} />

  {(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("watchShopCart")) || [];
    const itemCount = savedCart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    return itemCount > 0 ? (
      <span className="absolute -top-2.5 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {itemCount}
      </span>
    ) : null;
  })()}
</button>


  {/* Auth / User */}
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="hover:text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        setIsAuthOpen(true);
        setAuthMode("login");
      }}
      className="hover:text-gray-400"
    >
      <FaUser size={20} />
    </button>
  )}
</div>

      </nav>

      {/* --- CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-80 h-full shadow-lg p-4 relative">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsCartOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {(() => {
              const savedCart =
                JSON.parse(localStorage.getItem("watchShopCart")) || [];

              const updateCart = (updatedCart) => {
                localStorage.setItem(
                  "watchShopCart",
                  JSON.stringify(updatedCart)
                );
                window.location.reload();
              };

              const handleRemove = (id) => {
                const updatedCart = savedCart.filter((item) => item.id !== id);
                updateCart(updatedCart);
              };

              if (savedCart.length === 0) {
                return <p className="text-gray-600">Your cart is empty.</p>;
              }

              return (
                <>
                  <ul className="space-y-4">
                    {savedCart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-600 font-bold"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t pt-4">
                    <p className="font-bold mb-4">
                      Total: ${" "}
                      {savedCart
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* --- LOGIN/SIGNUP POPUP --- */}
      {isAuthOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsAuthOpen(false)}
            >
              <FaTimes size={20} />
            </button>

            <div className="flex justify-around mb-4 border-b">
              <button
                className={`flex-1 py-2 ${
                  authMode === "login"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 ${
                  authMode === "signup"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setAuthMode("signup")}
              >
                Signup
              </button>
            </div>

            {authMode === "login" ? (
              <form className="space-y-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full border rounded p-2"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignup}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  className="w-full border rounded p-2"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Signup
                </button>
              </form>
            )}

            {authMessage && (
              <p className="mt-4 text-center text-sm text-red-600">
                {authMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* --- CHECKOUT POPUP --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsCheckoutOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmOrder();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded p-2"
                value={orderDetails.name}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded p-2"
                value={orderDetails.number}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, number: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded p-2"
                value={orderDetails.email}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, email: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Address"
                className="w-full border rounded p-2"
                value={orderDetails.address}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, address: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
