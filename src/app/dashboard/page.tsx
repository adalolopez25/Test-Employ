'use client';

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import { useEffect } from "react";
import { fetcher } from "@/lib/api-client"; 

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const { user, setAuth } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user && !user) {
      setAuth({
        id: (session.user as any).id || session.user.email,
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        role: (session.user as any).role || "user",
      }, "google-session");
    }
  }, [status, session, user, setAuth]);

  const currentUser = user || (session?.user ? {
    id: (session.user as any).id || "",
    name: session.user.name || "Usuario",
    email: session.user.email || "",
    image: session.user.image,
    role: (session.user as any).role || "user"
  } : null);

  if (status === "loading") {
    return <p className="text-white p-8">Verificando acceso...</p>;
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="p-8 text-red-500 font-bold">
        Acceso restringido 
      </div>
    );
  }

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetcher<any[]>("/api/admin/users"),
  });

  if (isLoading) {
    return <p className="p-8 text-slate-400">Cargando registros del multiverso...</p>;
  }

  if (error instanceof Error) {
    return (
      <p className="p-8 text-red-500">
        {error.message}
      </p>
    );
  }

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-2 border-l-4 border-blue-600 pl-4">
        Panel de Comandancia
      </h1>

      <p className="text-xs text-slate-500 mb-8 pl-5">
        Conectado como: <span className="text-blue-500 font-bold">{currentUser.email}</span>
      </p>
      
      <div className="overflow-x-auto bg-transparent border border-white/10 rounded-3xl backdrop-blur-md">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 text-blue-500 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="p-6">Usuario</th>
              <th className="p-6">Email</th>
              <th className="p-6">Rol</th>
              <th className="p-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users?.map((u) => (
              <tr key={u._id} className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold">{u.name}</td>
                <td className="p-6 text-slate-400">{u.email}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    u.role === 'admin'
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition">
                    Editar Permisos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}