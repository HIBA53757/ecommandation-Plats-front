import { Link } from "react-router-dom";

export default function PlateCard({ plate }) {
  const name = plate.name || plate.nom;
  const price = plate.price || plate.prix;

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{price} MAD</p>
      {plate.is_available ? <span className="badge">Disponible</span> : <span className="badge red">Indisponible</span>}
      <br />
      <Link to={`/plates/${plate.id}`}>Voir détails</Link>
    </div>
  );
}