// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import Container from "@/components/layout/header/Container";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState<ReturnType<typeof getSupabaseBrowser> | null>(null);

  useEffect(() => {
    // Solo se ejecuta en el navegador (cliente)
    const client = getSupabaseBrowser();
    setSupabase(client);

    const checkUser = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUser(session.user);

      // Carga los datos del perfil desde la tabla "profiles"
      const { data, error } = await client
        .from("profiles")
        .select("username, full_name")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error cargando perfil:", error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    checkUser();

    // Escucha cambios en la autenticación
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Función para obtener iniciales del nombre o email
  const getInitials = () => {
    if (profile?.username) {
      return profile.username.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "US";
  };

  if (loading) {
    return (
      <Container>
        <div className="text-white text-center py-20">Cargando perfil...</div>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-slate-800/80 backdrop-blur rounded-2xl p-8 border border-slate-700">
        <div className="flex items-center gap-6 mb-8">
          {/* Avatar simple con iniciales */}
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {getInitials()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              {profile?.username || user?.email?.split("@")[0] || "Usuario"}
            </h1>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300">
          <p>
            <strong>Username:</strong> {profile?.username || "No definido"}
          </p>
          <p>
            <strong>Nombre completo:</strong>{" "}
            {profile?.full_name || "No definido"}
          </p>
          <p>
            <strong>Miembro desde:</strong>{" "}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("es-CO")
              : "Desconocido"}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition"
          >
            Ir al Dashboard
          </a>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-600/80 hover:bg-red-700 rounded-lg text-white font-medium transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </Container>
  );
}