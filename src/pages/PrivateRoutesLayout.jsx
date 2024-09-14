import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export default function PrivateRoutesLayout() {
  const [user, loading, error] = useAuthState(auth);

  // Optionally handle the loading and error states
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication state
  }

  if (error) {
    console.error("Auth error:", error);
    return <div>Error occurred</div>; // Handle authentication errors
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
