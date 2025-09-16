export default function Footer() {
  return (
    // <footer className="bg-black text-white text-center py-4 mt-8">
    //   <p>&copy; {new Date().getFullYear()} Timeless Watches. All rights reserved.</p>
    // </footer>
    <>
     {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Timeless</h3>
            <p className="text-gray-400">
              Luxury watches crafted with precision and passion for those who appreciate timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products?category=Men" className="hover:text-white transition">Men's Watches</a></li>
              <li><a href="/products?category=Women" className="hover:text-white transition">Women's Watches</a></li>
              {/* <li><a href="/products" className="hover:text-white transition">Luxury Collection</a></li>
              <li><a href="/products" className="hover:text-white transition">New Arrivals</a></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>123 Luxury Avenue</p>
              <p>New York, NY 10001</p>
              <p>+1 (555) 123-4567</p>
              <p>info@timelesswatches.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 Timeless Watches. All rights reserved.</p>
        </div>
      </footer></>
  );
}
