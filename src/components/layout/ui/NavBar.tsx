'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const NavLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    ...(isLoggedIn ? [] : [ // ← OCULTA si logueado
      { title: 'Login', href: '/login' },
      { title: 'Register', href: '/register' }
    ]),
  ];

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
  };

  return (
    <nav className="flex gap-4">
      {NavLinks.map(link => (
        <Link key={link.href} href={link.href} className="text-white hover:text-indigo-400">
          {link.title}
        </Link>
      ))}
      
      {isLoggedIn && user && (
        <div className="flex items-center gap-2 ml-auto">
          <span>{user.user_metadata?.username || user.email?.split("@")[0]}</span>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}