export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow hover:shadow-2xl transition transform hover:scale-105 p-4 flex flex-col">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h3 className="font-semibold">{product.name}</h3>

      <p className="text-green-600 font-bold">₹{product.price}</p>

      <button
        onClick={() => {
          console.log("CLICKED", product); // 🔍 DEBUG
          addToCart(product);
        }}
        className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}