import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/plates">Plats</Link>
      </div>
      <div className="auth-links">
        {token ? (
          <>
            <Link to="/profile">Profil ({user?.name})</Link>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}