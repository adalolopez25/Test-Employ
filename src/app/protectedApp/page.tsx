"use client";

import { useState, useEffect } from "react";

export default function ProtectedApp({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authorized") === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const SECRET_KEY = process.env.NEXT_PUBLIC_KEY;

    if (password === SECRET_KEY) {
      setIsAuthorized(true);
      localStorage.setItem("authorized", "true");
    } else {
      alert("Clave incorrecta");
      setPassword("");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-black/70">
        <form
          onSubmit={handleSubmit}
          className="bg-black/50 p-12 rounded-3xl flex flex-col items-center gap-6"
        >
          <h2 className="text-white text-3xl font-black italic mb-4">
            Acceso Restringido
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la clave"
            className="px-4 py-2 rounded-xl text-white w-64 focus:outline-none"
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

  return <>{children}</>;
}