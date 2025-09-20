import React from "react";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // Replace with your actual Web3Forms access key
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Your email has been sent!");
      event.target.reset();
    } else {
      console.error("Error", data);
      setResult("❌ Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <a
                href="mailto:arainhammad159@gmail.com"
                className="text-blue-600 hover:underline"
              >
                arainhammad159@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <a href="tel:+923113436386" className="text-blue-600 hover:underline">
                +92 (311) 3436386
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p>Sukkur, Pakistan</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/hammad-front-end-developer/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/hammadarain"
                className="text-pink-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://github.com/imhammad21"
                className="text-gray-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
              className="w-full border rounded p-2 focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
              className="w-full border rounded p-2 focus:ring-2 focus:ring-black"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              name="message"
              required
              className="w-full border rounded p-2 focus:ring-2 focus:ring-black"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Send Message
            </button>

            {/* Status Message */}
            {result && (
              <p
                className={`text-center font-semibold ${
                  result.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {result}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
