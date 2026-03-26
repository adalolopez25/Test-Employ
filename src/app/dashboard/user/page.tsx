"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function UserDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["user", "admin"]}>
      <UserDashboard />
    </ProtectedRoute>
  );
}