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

        const response = await api.get(`/plates/${id}`);
        setPlate(response.data);
      } catch (err) {
        setError("Erreur : Plat introuvable ou API inaccessible !");
      } finally {
        setLoading(false);
      }
    }

    fetchPlate();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Détails du plat</h1>

      <h2>{plate.name}</h2>
      <p>Prix : {plate.price} MAD</p>

      <p>
        Statut :{" "}
        {plate.is_available ? (
          <span className="available">Disponible</span>
        ) : (
          <span className="not-available">Indisponible</span>
        )}
      </p>
    </div>
  );
}