import { useParams } from "react-router-dom";

export default function PlateDetail() {
  const { id } = useParams();

  const plates = [
    { id: 1, name: "coscos", price: 50, is_available: true },
    { id: 2, name: "tajin", price: 70, is_available: false },
    { id: 3, name: "pasta", price: 90, is_available: true },
    { id: 4, name: "sushi", price: 30, is_available: true },
    { id: 5, name: "ramen", price: 80, is_available: false },
  ];

  const plate = plates.find((p) => p.id === parseInt(id));

  if (!plate) {
    return <h2>Plat introuvable</h2>;
  }

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