"use client";
import { useEffect, useState } from "react";

export default function AdminMenuPage() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  async function addItem(e) {
    e.preventDefault();
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Item added!");
      window.location.reload();
    }
  }

  async function deleteItem(id) {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    setMenu(menu.filter((m) => m._id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-orange-600 mb-6 text-center">
        Manage Menu
      </h1>
      <form onSubmit={addItem} className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold mb-3">Add New Item</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mt-3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Item
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {menu.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="font-bold text-orange-600">₹{item.price}</p>
            <button
              onClick={() => deleteItem(item._id)}
              className="text-red-500 mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
