import React from "react";
import { useLogout } from "@/hooks/useLogout";
import Button from "./Button";

export default function UserProfile() {
  const logout = useLogout();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="flex items-center space-x-4">
      {user && (
        <span className="text-teal-800 font-medium">Hi, {user.name}</span>
      )}
      <Button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700"
        type="button"
      >
        Logout
      </Button>
    </div>
  );
}
