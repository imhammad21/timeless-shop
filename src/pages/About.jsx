import React from "react";
import { FaHistory, FaBullseye, FaGem, FaHandshake } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-20 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          About Timeless Watches
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Crafting elegance, precision, and style in every timepiece we create.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Our Story */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="text-black mb-4 text-4xl flex justify-center">
            <FaHistory />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Our Story</h2>
          <p className="text-gray-600 text-center">
            Founded with a passion for craftsmanship, Timeless creates watches that
            are not just tools but a statement of personality and elegance.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="text-black mb-4 text-4xl flex justify-center">
            <FaBullseye />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Our Mission</h2>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>High-quality watches with modern elegance.</li>
            <li>Exceptional customer service and experience.</li>
            <li>Build a community of watch enthusiasts.</li>
          </ul>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="text-black mb-4 text-4xl flex justify-center">
            <FaGem />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Why Choose Us</h2>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Curated collections with premium craftsmanship.</li>
            <li>Affordable luxury for everyone.</li>
            <li>Classic and contemporary designs.</li>
          </ul>
        </div>

        {/* Our Promise */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <div className="text-black mb-4 text-4xl flex justify-center">
            <FaHandshake />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Our Promise</h2>
          <p className="text-gray-600 text-center">
            Every timepiece is a promise of quality, style, and durability.
            Your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Join the Timeless Experience
        </h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Discover the elegance and precision in every watch we craft. Time is precious, and so are you.
        </p>
        <button  className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          <a href="./products">Explore Collection</a>
        </button>
      </div>
    </section>
  );
}
