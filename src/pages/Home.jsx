import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react"; // for rating icon


// Sample product data
const featuredProducts = {
  men: [
    { id: 1, name: "Classic Chronograph", price: 349, image: "photos/image4.png" },
    { id: 2, name: "Diver Professional", price: 499, image: "photos/image5.png" },
    { id: 3, name: "Executive Steel", price: 429, image: "photos/image6.png" },
    { id: 4, name: "Aviator Classic", price: 379, image: "photos/image3.png" }
  ],
  women: [
    {
      id: 5, name: "Elegance Rose Gold", price: 329,
      image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6, name: "Pearl Mother-of-Pearl", price: 459,
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7, name: "Slim Diamond Dial", price: 599,
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    { id: 8, name: "Minimalist Ceramic", price: 389, image: "photos/image5.png" }
  ]
};

// Extra sample section (Sveston-style)
const extraProducts = [
  { id: 101, name: "Aristos", price: 19999, discount: 17, rating: 4.8, image: "photos/image1.png", type: "Men's Stainless Steel" },
  { id: 102, name: "Bullston", price: 24999, discount: 25, rating: 4.7, image: "photos/image2.png", type: "Men's Stainless Steel" },
  { id: 103, name: "Spectrum", price: 22999, discount: 19, rating: 4.6, image: "photos/image3.png", type: "Men's Stainless Steel" },
  { id: 104, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" },
  { id: 105, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" },
  { id: 106, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" },
  { id: 107, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" },
  { id: 108, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" },
  { id: 109, name: "Infinity", price: 17999, discount: 15, rating: 4.5, image: "photos/image4.png", type: "Men's Rubber" }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [form, setForm] = useState({ fullname: "", email: "", phone: "", address: "" });

  const handleOrder = () => {
    if (!selectedProduct) return;
    const message = `
🛒 New Order Request
----------------------
📦 Product: ${selectedProduct.name}
💰 Price: Rs ${selectedProduct.price}
🏷 Discount: ${selectedProduct.discount}%
⭐ Rating: ${selectedProduct.rating}
🖼 Product Image: ${window.location.origin}${selectedProduct.image}

👤 Customer: ${form.fullname}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
🏠 Address: ${form.address}
    `;

    // Option 1: Console + alert
    console.log(message);
    alert("Order sent to seller ✅\n(Check console for details)");

    // Option 2 (optional): WhatsApp redirect
    const phoneNumber = "923113436386"; // Replace with your seller WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    

    setShowCheckoutModal(false);
    setForm({ fullname: "", email: "", phone: "", address: "" });
  };

  return (
    <>
      <Hero />

      {/* Featured Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Featured Watches</h2>
          <p className="mt-2 text-gray-600">
            Explore our exclusive collection of luxury timepieces.
          </p>
        </div>

        {/* Gallery Section */}
        {/* ... (your existing gallery code) */}
           <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Timeless Elegance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="group overflow-hidden rounded-2xl"
              style={{ objectFit: "cover" }}
            >
              <img
                style={{ height: "80%" }}
                src="photos/image2.png"
                alt="Classic Watch"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl">
              <img
                style={{ height: "80%" }}
                src="photos/image1.png"
                alt="Luxury Watch"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl">
              <img
                style={{ height: "80%" }}
                src="photos/image3.png"
                alt="Modern Watch"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
          </div>
        </div>


        {/* Men's Collection */}
        {/* ... (your existing men's collection code) */}
         <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Men's Collection</h3>
            <a
              href="/products?category=Men"
              className="text-gray-600 hover:text-black transition"
            >
              View All →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.men.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="mt-3">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-gray-600">Rs {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Women's Collection */}
        {/* ... (your existing women's collection code) */}
              <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Women's Collection</h3>
            <a
              href="/products?category=Women"
              className="text-gray-600 hover:text-black transition"
            >
              View All →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.women.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="mt-3">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-gray-600">Rs {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Extra Sveston-Style Product Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Premium Collection</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {extraProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white shadow-lg rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}
              >
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
                <span className="absolute top-3 right-3 flex items-center bg-white px-2 py-1 rounded-md shadow">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </span>
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.type}</p>
                  <p className="mt-2 text-gray-800 font-bold">Rs {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-56 object-contain mb-4" />
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
            <p className="text-gray-600">{selectedProduct.type}</p>
            <p className="mt-2 text-lg font-semibold">Rs {selectedProduct.price}</p>
            <button
              className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              onClick={() => { setShowProductModal(false); setShowCheckoutModal(true); }}
            >
              Buy Now
            </button>
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
              <input type="text" placeholder="Full Name" value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                className="w-full border p-2 rounded-lg" />
              <input type="email" placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border p-2 rounded-lg" />
              <input type="tel" placeholder="Phone Number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border p-2 rounded-lg" />
              <textarea placeholder="Address" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border p-2 rounded-lg" />
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

      {/* Brand Story Section */}
      {/* ... (your existing Brand Story code) */}
    </>
  );
}
