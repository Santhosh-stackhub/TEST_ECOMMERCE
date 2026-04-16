import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ setSearch, cart }) {
  const nav = useNavigate();

  const names = ["DevCrew", "DemoStore"];
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % names.length);
        setAnimate(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-yellow-500 px-6 py-3 shadow-lg">
      
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">

        {/* LOGO (AUTO SAFE WIDTH) */}
        <div
          onClick={() => nav("/")}
          className="text-2xl font-extrabold cursor-pointer flex items-center gap-1 w-[200px]"
        >
          <span className="text-green-300">&lt;</span>

          <span className={`devcrew-animate ${animate ? "show" : "hide"}`}>
            {names[index]}
          </span>

          <span className="text-yellow-300">/&gt;</span>
        </div>

        {/* SEARCH */}
        <input
          className="w-1/3 p-2 text-black rounded focus:outline-none"
          placeholder="Search for products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CART */}
        <button
          onClick={() => nav("/cart")}
          className="bg-white text-green-700 px-4 py-1 rounded hover:bg-gray-100"
        >
          Cart ({cart.length})
        </button>

      </div>
    </div>
  );
}