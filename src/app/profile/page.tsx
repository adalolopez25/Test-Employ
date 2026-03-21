"use client";

import { useAuthStore } from "@/hooks/store/useAuthStore";

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-white">
        No has iniciado sesión
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "??";
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="max-w-3xl mx-auto">

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">

          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-700">
              {getInitials(user.name)}
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-white/60 text-sm">{user.email}</p>
              <span className="text-xs text-blue-400 uppercase">
                {user.role}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span className="text-white/50 text-sm">Nombre</span>
              <span className="text-sm">{user.name}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-3">
              <span className="text-white/50 text-sm">Correo</span>
              <span className="text-sm">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Rol</span>
              <span className="text-sm capitalize">{user.role}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;