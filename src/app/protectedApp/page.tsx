"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ProtectedApp({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authorized") === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/protected", {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      setIsAuthorized(true);
      localStorage.setItem("authorized", "true");
      setError("");
    } else {
      setError("Clave incorrecta");
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

          {/* Input con icono */}
          <div className="relative w-64">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la clave"
              className="px-4 py-2 pr-10 rounded-xl text-white w-full focus:outline-none bg-transparent border border-white/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

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