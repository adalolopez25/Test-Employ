// app/admin/dashboard/page.tsx
'use client';

import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetch("/api/admin/users").then(res => res.json())
  });

  if (isLoading) return <p>Cargando registros del multiverso...</p>;

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-8 border-l-4 border-blue-600 pl-4">
        Panel de Comandancia
      </h1>
      
      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-3xl">
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
            {users?.map((u: any) => (
              <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6 font-bold">{u.name}</td>
                <td className="p-6 text-slate-400">{u.email}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    u.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
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