"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/api-client";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-white">
        No has iniciado sesión
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Avatar actualizado en S3");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetcher("/api/profile/update", {
        method: "PUT",
        body: JSON.stringify({ name, email, password }),
      });
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar perfil");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-white/60">Username</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-white/60">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-5 py-2 rounded-lg w-full font-bold"
            >
              Save changes
            </button>
          </form>

          <div className="mt-10 border-t border-white/10 pt-6">
            <label className="block mb-2 text-sm text-white/60">
              Cambiar Imagen de Perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setFile(file); // Aquí tomamos un único 'File' de la 'FileList'
                } else {
                  setFile(null);
                }
              }}
              className="mb-4 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
            <button
              type="button"
              onClick={handleUpload}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition font-bold"
            >
              Upload to S3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
