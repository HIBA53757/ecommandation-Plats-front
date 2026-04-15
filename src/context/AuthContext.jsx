import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!token) {
        setLoadingAuth(false);
        return;
      }
      try {
        const res = await api.get("/profile");
        console.log("Profile API Raw Response:", res.data);
        const userData = res.data?.data || res.data?.user || res.data;
        setUser(userData);
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
    const res = await api.post("/login", { email, password });
    const data = res.data;
    const receivedToken = data.token || data.access_token || data.data?.token;
    const receivedUser = data.user || data.data?.user || data;

    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setUser(receivedUser);
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
    } catch (e) {}
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);