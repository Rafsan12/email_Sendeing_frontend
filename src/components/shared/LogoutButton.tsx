"use client";

import { logoutUser } from "@/service/auth/logout";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
