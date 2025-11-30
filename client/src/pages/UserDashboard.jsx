import React from "react";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/layout/Sidebar";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  console.log(user)

  return (
   <>
   </>
  );
}