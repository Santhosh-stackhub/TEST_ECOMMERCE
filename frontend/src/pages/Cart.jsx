import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const nav = useNavigate();

  const increase = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (index) => {
    const updated = [...cart];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow flex gap-4">

                <img src={item.image} className="w-24 h-24 object-cover rounded" />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-green-600 font-bold">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decrease(index)} className="px-2 bg-gray-200">-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increase(index)} className="px-2 bg-gray-200">+</button>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow h-fit">
            <h2 className="font-semibold mb-3">Price Details</h2>

            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => nav("/checkout")}
              className="bg-green-500 text-white w-full py-2 mt-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}