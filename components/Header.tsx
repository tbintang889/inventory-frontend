'use client';
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Inventory Management</div>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <a href="/login" className="bg-blue-600 text-white px-3 py-1 rounded">Login</a>
        )}
      </div>
    </header>
  );
}
