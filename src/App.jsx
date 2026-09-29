import { useState } from "react";
import { getValidUser } from "./auth/authService";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getValidUser());

  return (
    <main className="app-container">
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Login onLoginSuccess={() => setUser(getValidUser())} />
      )}
    </main>
  );
}
