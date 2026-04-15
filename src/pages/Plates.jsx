import { useEffect, useState } from "react";
import api from "../api/axios";
import PlateCard from "../components/PlateCard";
import { useAuth } from "../context/AuthContext";

export default function Plates() {
  const { token, loadingAuth } = useAuth();
  const [plates, setPlates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadingAuth || !token) return;

    async function fetchPlates() {
      try {
        setLoading(true);
        // Corrected route to /plats
        const res = await api.get("/plats");
        
        console.log("Plates Raw Data:", res.data);

        // Check for common Laravel patterns: res.data.data or res.data
        const actualData = res.data?.data || res.data;
        
        setPlates(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les plats");
      } finally {
        setLoading(false);
      }
    }
    fetchPlates();
  }, [token, loadingAuth]);

  const filtered = plates.filter(p => 
    (p.name || p.nom || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loadingAuth || loading) return <div className="loader">Chargement...</div>;

  return (
    <div className="container">
      <h1>Nos Plats</h1>
      <input 
        type="text" 
        placeholder="Rechercher un plat..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {filtered.map(p => (
          <PlateCard key={p.id} plate={p} />
        ))}
        {filtered.length === 0 && !loading && <p>Aucun plat trouvé dans la base de données.</p>}
      </div>
    </div>
  );
}