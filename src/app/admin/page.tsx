"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function AdminPage() {

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  );

}