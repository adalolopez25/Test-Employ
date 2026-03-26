"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/core/hooks/store/useAuthStore";

function AuthSync() {
  const { data: session, status } = useSession();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user && !user) {
      const syncUser = {
        id: (session.user as any).id || session.user.email,
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        role: (session.user as any).role || "user",
      };

      setUser(syncUser);
    }
  }, [session, status, user, setUser]);

  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}