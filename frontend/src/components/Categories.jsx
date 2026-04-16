export default function Categories({ setFilter }) {
  const categories = ["Electronics", "Clothing", "Footwear"];

  return (
    <div className="flex justify-center gap-10 bg-white shadow p-4">
      <button onClick={() => setFilter("")}>All</button>

      {categories.map((cat, i) => (
        <button
          key={i}
          className="hover:text-blue-600"
          onClick={() => setFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}