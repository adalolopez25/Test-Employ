"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.user?.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard/user");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="p-8 text-white">
        Cargando sesión...
      </div>
    );
  }

  return null;
}