import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Load user if token exists
  useEffect(() => {
    async function fetchUser() {
      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const res = await api.get("/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoadingAuth(false);
      }
    }

    fetchUser();
  }, [token]);

  async function login(email, password) {
    const { data } = await api.post("/login", { email, password });

    setToken(data.token);
    localStorage.setItem("token", data.token);

    setUser(data.user);
  }

async function register(name, email, password) {
  const { data } = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation: password,
    role: "user", 
  });

  setToken(data.token);
  setUser(data.user);
  localStorage.setItem("token", data.token);
}

  async function logout() {
    await api.post("/logout");

    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);