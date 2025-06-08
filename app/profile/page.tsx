"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button, ButtonGroup } from "@heroui/button";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">👋 Welcome to your profile</h1>
      <p className="mt-2">
        Your JWT: <code className="break-all">{user?.token}</code>
      </p>
      <Button className="mt-4" size="md" color="danger" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
