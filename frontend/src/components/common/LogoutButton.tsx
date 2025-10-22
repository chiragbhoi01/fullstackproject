import React from "react";
import { useLogout } from "@/hooks/useLogout"; 
import Button from "./Button"; 

export default function LogoutButton() {
  const logout = useLogout();

  return (
    <Button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700"
      type="button"
    >
      Logout
    </Button>
  );
}
