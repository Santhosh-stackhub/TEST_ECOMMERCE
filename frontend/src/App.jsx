import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://YOUR-BACKEND.onrender.com/products";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL)
      .then(res => {
        console.log("DATA:", res.data);
        setProducts(res.data);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">DevCrew Store 🚀</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl mt-2">{p.name}</h2>
              <p className="text-green-600 font-bold">₹{p.price}</p>
              <button className="mt-3 bg-yellow-400 px-4 py-2 rounded w-full">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found 😢</p>
        )}
      </div>
    </div>
  );
}

export default App;