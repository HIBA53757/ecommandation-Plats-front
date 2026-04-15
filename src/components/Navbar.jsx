import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2>FoodApp</h2>

      <div className="nav-links">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/plates" className="nav-item">
          Plates
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          Profile
        </NavLink>

        {!token ? (
          <>
            <NavLink to="/login" className="nav-item">
              Login
            </NavLink>

            <NavLink to="/register" className="nav-item">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="user-name">
              {user ? user.name : "User"}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}