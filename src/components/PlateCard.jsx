import { Link } from "react-router-dom";

export default function PlateCard({ id, name, price, is_available }) {
  return (
    <div className="plate-card">
      <h2>{name}</h2>
      <p>{price} MAD</p>

      {is_available ? (
        <span className="available">Disponible</span>
      ) : (
        <span className="not-available">Indisponible</span>
      )}

      <br />

      <Link to={`/plates/${id}`} className="details-btn">
        Voir détails
      </Link>
    </div>
  );
}