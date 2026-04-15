import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/register", formData);
      await login(formData.email, formData.password);
      navigate("/plates");
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
  }

  return (
    <div className="auth-form">
      <h1>Inscription</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={formData.password} 
          onChange={e => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirmer le mot de passe" 
          value={formData.password_confirmation} 
          onChange={e => setFormData({...formData, password_confirmation: e.target.value})} 
          required 
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}