import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function PlateDetail() {
  const { id } = useParams();

  const [plate, setPlate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlate() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/plats/${id}`);
        setPlate(res.data);
      } catch (err) {
        setError("Erreur: impossible de charger ce plat");
      } finally {
        setLoading(false);
      }
    }

    fetchPlate();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!plate) return <h2>Plat introuvable</h2>;

  return (
    <div>
      <h1>Détail du plat</h1>
      <h2>{plate.name}</h2>
      <p>{plate.price} MAD</p>
    </div>
  );
}