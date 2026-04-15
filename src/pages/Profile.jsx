import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return <div className="loader">Chargement...</div>;

  const displayUser = user?.user || user;

  return (
    <div className="container">
      <h1>Mon Profil</h1>
      <div className="card">
        {displayUser ? (
          <>
            <p><strong>Nom:</strong> {displayUser.name || "Non défini"}</p>
            <p><strong>Email:</strong> {displayUser.email || "Non défini"}</p>
          </>
        ) : (
          <p>Aucune information utilisateur disponible.</p>
        )}
      </div>
    </div>
  );
}