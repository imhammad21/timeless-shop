import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative bg-black text-white flex flex-col items-center justify-center h-[80vh] text-center px-4 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      
      {/* Featured watch image */}
      <img 
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80" 
        alt="Luxury Watch" 
        className="absolute right-10 bottom-10 w-48 md:w-64 rounded-lg shadow-2xl opacity-90"
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold">Timeless Watches</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Discover luxury and elegance in every tick.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition font-medium">
         {/* <a  href="/products">Shop Now</a> */}
          <Link to="/products">Shop Now</Link>
        </button>
      </div>
    </section>
  );
}