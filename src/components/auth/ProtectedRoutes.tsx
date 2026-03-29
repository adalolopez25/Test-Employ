"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    const role = session.user?.role as string;

    if (!allowedRoles.includes(role)) {
      router.replace("/");
    }

  }, [session, status, router, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="p-10 text-white">
        Verificando acceso al multiverso...
      </div>
    );
  }

  return <>{children}</>;
}