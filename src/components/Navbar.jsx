import { NavLink } from "react-router-dom";

export default function Navbar() {
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

        <NavLink to="/login" className="nav-item">
          Login
        </NavLink>

        <NavLink to="/register" className="nav-item">
          Register
        </NavLink>
      </div>
    </nav>
  );
}