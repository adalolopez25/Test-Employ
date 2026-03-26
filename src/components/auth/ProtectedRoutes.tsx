"use client";

import { useAuthStore } from "@/core/hooks/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [user, router, allowedRoles]);

  if (!user) {
    return (
      <div className="p-8 text-white">
        Verificando sesión...
      </div>
    );
  }

  return <>{children}</>;
}