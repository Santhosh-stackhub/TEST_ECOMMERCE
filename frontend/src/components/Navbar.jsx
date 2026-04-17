import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#0F172A] border-b border-gray-700">
      
      <Link to="/" className="text-2xl font-bold text-green-400">
        &lt; DevCrew /&gt;
      </Link>

      <div className="flex gap-4">
        <Link to="/store" className="text-white hover:text-yellow-400">
          Store
        </Link>

        <Link
          to="/cart"
          className="bg-yellow-400 text-black px-4 py-1 rounded"
        >
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;