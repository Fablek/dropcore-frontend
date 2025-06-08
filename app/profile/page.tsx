"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
}
