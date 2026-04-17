import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// DevCrew sections
import Hero from "./components/Hero";

// Ecommerce pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="bg-[#0F172A] text-white min-h-screen">
      
      <Navbar />

      <Routes>
        {/* DEV CREW LANDING */}
        <Route
          path="/"
          element={
            <>
              <Hero />

              <div className="p-10 text-center">
                <h2 className="text-3xl text-yellow-400 font-bold">
                  DevCrew 🚀
                </h2>

                <p className="mt-4 text-gray-300">
                  We build web apps, mobile apps, and digital solutions.
                </p>

                <a
                  href="/store"
                  className="mt-6 inline-block bg-green-400 text-black px-6 py-2 rounded"
                >
                  View Demo Store
                </a>
              </div>
            </>
          }
        />

        {/* ECOMMERCE */}
        <Route path="/store" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;