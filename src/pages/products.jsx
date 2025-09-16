import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { FaStar as Star } from "react-icons/fa";
import products from "../Data/product"; // ✅ fixed import (no curly braces)

export default function Products({ addToCart, cart }) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ handle order function with WhatsApp integration
  const handleOrder = () => {
    if (!form.fullname || !form.email || !form.phone || !form.address) {
      alert("⚠️ Please fill in all fields before confirming your order.");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderText = `
*New Order Received* 🛒
--------------------------------
👤 Name: ${form.fullname}
📧 Email: ${form.email}
📞 Phone: ${form.phone}
🏠 Address: ${form.address}

🛍️ Items:
${cart
  .map(
    (item) =>
      `- ${item.name} x ${item.quantity} = Rs ${item.price * item.quantity}`
  )
  .join("\n")}

💰 Total: Rs ${total}
--------------------------------
✅ Please confirm my order!
`;

    // Replace with your WhatsApp number (include country code, no + or leading 0)
    const phoneNumber = "923113436386"; // Example: 92 = Pakistan, then your number

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      orderText
    )}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Reset form + close modal
    setForm({ fullname: "", email: "", phone: "", address: "" });
    setShowCheckoutModal(false);
  };

  // ✅ use imported products instead of sampleProducts
  let filteredProducts = products.filter((p) =>
    filterCategory === "All" ? true : p.category === filterCategory
  );

  // Sorting
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <section className="p-6 max-w-7xl mx-auto pt-20">
      {/* Page Heading */}
      <h2 className="text-3xl font-bold">Our Collection</h2>
      <p className="mt-2 text-gray-600">Browse our range of premium watches.</p>

      {/* --- Sub Navbar --- */}
      <div className="flex flex-wrap items-center gap-4 mt-6 p-4 bg-gray-100 rounded-lg">
        {/* Category Tabs */}
        <div className="flex gap-3">
          {["All", "Men", "Women"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded ${
                filterCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort by Price */}
        <div className="ml-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.slice(0, visibleCount).map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const quantityInCart = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">Rs {product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <button
                  className={`mt-2 w-full py-1 rounded ${
                    quantityInCart > 0
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  {quantityInCart > 0
                    ? `Added (${quantityInCart})`
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Show More Button --- */}
      {visibleCount < filteredProducts.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                prev + 10 > products.length ? products.length : prev + 10
              )
            }
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Show More
          </button>
        </div>
      )}

      {/* --- Product Detail Popup --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
              onClick={() => setSelectedProduct(null)}
            >
              <FaTimes size={20} />
            </button>

            {/* Product Image */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded"
            />

            {/* Product Info */}
            <h3 className="text-2xl font-bold mt-4">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-600">Rs {selectedProduct.price}</p>
            <p className="mt-2 text-gray-500">{selectedProduct.description}</p>
            <p className="mt-1 text-sm text-gray-400">
              Category: {selectedProduct.category}
            </p>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  alert("Product added to cart!");
                }}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 border py-2 rounded hover:bg-gray-200"
                onClick={() => {
                  setShowCheckoutModal(true);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullname}
                onChange={(e) =>
                  setForm({ ...form, fullname: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <textarea
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              onClick={handleOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
