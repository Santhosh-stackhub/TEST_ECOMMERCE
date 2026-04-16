export default function Checkout({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
    localStorage.removeItem("cart");
    window.location.href = "/";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">

      <h1 className="text-2xl font-bold">Checkout</h1>

      <h2 className="mt-4">Total: ₹{total}</h2>

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}