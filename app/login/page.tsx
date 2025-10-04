'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/"); // redirect ke home
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="text"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
