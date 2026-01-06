"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/app/components/Card";
import Container from "@/components/layout/header/Container";
import Modal from "@/components/layout/ui/Modal";
import type { Character } from "@/types/character";
import type { ApiResponse } from "@/types/ApiResponse";

export default function DashboardPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<Character[]>([]);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* 🔒 Cargar usuario local */
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) router.replace("/login");
    else setUser(JSON.parse(u));
  }, [router]);

  /* 🚪 Logout */
  const handleLogout = () => {
    document.cookie = "session=; path=/; max-age=0";
    localStorage.removeItem("user");
    router.push("/login");
  };

  /* 🔹 Obtener personajes */
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data: ApiResponse = await res.json();
        setCharacters(data.results);
        setFiltered(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  /* 🔹 Filtro dinámico */
  useEffect(() => {
    let temp = [...characters];
    if (search)
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    if (statusFilter !== "all")
      temp = temp.filter((c) => c.status === statusFilter);
    setFiltered(temp);
    const featured = temp.filter((c) => (ratings[c.id] || 0) >= 4);
    setHighlighted(featured);
  }, [search, statusFilter, characters, ratings]);

  const handleRate = (id: number, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  if (loading)
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );

  return (
    <Container className="flex flex-col items-center min-h-screen bg-slate-900 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center w-full max-w-7xl mb-8">
        <h1 className="text-4xl font-bold text-white">Character Dashboard</h1>

        <div className="relative">
          {user ? (
            <div className="relative inline-block text-left">
              {/* Botón avatar + dropdown */}
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <img
                  src={user.user_metadata?.avatar || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-white font-semibold">
                  {user.user_metadata?.username || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-10">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-slate-700"
                  >
                    Perfil
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-white hover:bg-slate-700"
                  >
                    Configuración
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Mostrar login/register si NO hay usuario
            <div className="flex gap-4">
              <a href="/login" className="text-white hover:text-indigo-400">
                Login
              </a>
              <a href="/register" className="text-white hover:text-indigo-400">
                Register
              </a>
            </div>
          )}
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg px-4 py-2 bg-slate-700 text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg px-4 py-2 bg-slate-700 text-white"
        >
          <option value="all">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Featured
        </button>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((c) => (
          <Card
            key={c.id}
            character={c}
            rating={ratings[c.id] || 0}
            onRate={handleRate}
          />
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} title="Featured Characters">
          {highlighted.length === 0 && (
            <p className="text-gray-300">There are no prominent characters.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {highlighted.map((c) => (
              <Card
                key={c.id}
                character={c}
                rating={ratings[c.id]}
                onRate={handleRate}
              />
            ))}
          </div>
        </Modal>
      )}
    </Container>
  );
}
