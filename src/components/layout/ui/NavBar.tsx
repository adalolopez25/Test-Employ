'use client';

import { NavLinks } from "@/constants/navLink";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        const { data: profileData } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();

        setAvatarUrl(profileData?.avatar_url || '/default-avatar.png');
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setAvatarUrl(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/50 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Links principales */}
        <ul className="flex items-center gap-8">
          {NavLinks.map((data) => (
            <li key={data.title}>
              <Link
                href={data.href}
                className="relative text-sm font-medium text-white transition-colors duration-200 hover:text-indigo-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {data.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login/Register o Avatar */}
        {!user ? (
          <div className="flex gap-4">
            <Link href="/login" className="text-white font-medium hover:text-indigo-600">Login</Link>
            <Link href="/register" className="text-white font-medium hover:text-indigo-600">Register</Link>
          </div>
        ) : (
          <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
            <button
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-600 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={avatarUrl || '/default-avatar.png'}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg flex flex-col">
                <Link href="/profile" className="px-4 py-2 text-white hover:bg-slate-700">Profile</Link>
                <Link href="/settings" className="px-4 py-2 text-white hover:bg-slate-700">Settings</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white text-left hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
