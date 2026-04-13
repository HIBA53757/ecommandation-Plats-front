import { useState } from "react";
import PlateCard from "../components/PlateCard";

export default function Plates() {
  const [search, setSearch] = useState("");

  const plates = [
    { id: 1, name: "coscos", price: 50, is_available: true },
    { id: 2, name: "tajin", price: 70, is_available: false },
    { id: 3, name: "pasta", price: 90, is_available: true },
    { id: 4, name: "sushi", price: 30, is_available: true },
    { id: 5, name: "ramen", price: 80, is_available: false },
  ];

  const filtered = plates.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Menu</h1>

      <input
        type="text"
        placeholder="taper un plat"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p>no plats</p>}

      <div className="plate-list">
        {filtered.map((p) => (
          <PlateCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}