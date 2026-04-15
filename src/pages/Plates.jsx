import { useEffect, useState } from "react";
import api from "../api/axios";
import PlateCard from "../components/PlateCard";

export default function Plates() {
  const [plates, setPlates] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlates() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/plates");
        setPlates(res.data);
      } catch (err) {
        setError("Impossible de charger les plats (API error)");
      } finally {
        setLoading(false);
      }
    }

    fetchPlates();
  }, []);

  const filtered = plates.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Plats</h1>

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && <p>Aucun plat trouvé</p>}

      <div className="plate-list">
        {filtered.map((p) => (
          <PlateCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}