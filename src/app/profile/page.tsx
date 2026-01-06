'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔒 Obtener sesión y perfil
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session || !session.user) {
        router.replace("/login");
        return;
      }

      setUser(session.user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="text-white flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-600 cursor-pointer relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={profile?.avatar_url || "/default-avatar.png"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-20 w-40 bg-slate-700 rounded-lg shadow-lg flex flex-col">
                  <button 
                    onClick={() => router.push("/profile")}
                    className="px-4 py-2 text-white hover:bg-slate-600 text-left"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => router.push("/settings")}
                    className="px-4 py-2 text-white hover:bg-slate-600 text-left"
                  >
                    Settings
                  </button>
                  <button 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/login");
                    }}
                    className="px-4 py-2 text-white hover:bg-slate-600 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">{profile?.username || user.email}</h1>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-3">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Username:</span> {profile?.username || "User"}</p>
          <p><span className="font-semibold">Status:</span> Active</p>
          <p><span className="font-semibold">Role:</span> User</p>
        </div>

        {/* BOTONES */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
