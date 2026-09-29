import { getToken, logout } from "../auth/authService";

export default function Dashboard({ user, onLogout }) {
  const token = getToken();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Dashboard (Protected)</h2>
        <p className="card-subtitle">Authenticated Session Active</p>
      </div>

      <div className="user-details">
        <div className="info-row">
          <span className="info-label">User ID:</span>
          <span className="info-value" id="user-id-display">{user?.userId}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Role:</span>
          <span className={`role-badge ${user?.role}`} id="user-role-display">
            {user?.role}
          </span>
        </div>
      </div>

      {user?.role === "admin" && (
        <div className="ok" id="admin-banner">
          Admin panel unlocked.
        </div>
      )}

      <div className="token-section">
        <label className="token-label" htmlFor="stored-token-display">
          Stored token:
        </label>
        <div className="token" id="stored-token-display">
          {token}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="btn-primary btn-logout"
        id="logout-button"
      >
        Logout
      </button>
    </div>
  );
}
