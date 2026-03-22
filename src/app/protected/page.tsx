"use client";

import { useState } from "react";

export default function ProtectedApp({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const SECRET_KEY = process.env.PROTECTED_SECRET_KEY; // <--- Cambia esta clave por la tuya

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_KEY) {
      setIsAuthorized(true);
    } else {
      alert("Clave incorrecta");
      setPassword("");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md p-12 rounded-3xl flex flex-col items-center gap-6"
        >
          <h2 className="text-white text-3xl font-black italic uppercase mb-4">
            Acceso Restringido
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la clave"
            className="px-4 py-2 rounded-xl text-black w-64 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // Si la clave es correcta, renderiza la app
  return <>{children}</>;
}