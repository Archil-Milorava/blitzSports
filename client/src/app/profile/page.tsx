"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  nickName: string;
  avatar: string;
  roles: string[];
  createdAt: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/"); 
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  const isAuthorOrAdmin =
    user.roles.includes("admin") || user.roles.includes("author");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt={user.fullName}
          className="w-24 h-24 rounded-full mx-auto border-4 border-violet-500 shadow-sm"
        />

        {/* User Info */}
        <h1 className="text-2xl font-bold mt-4">{user.fullName}</h1>
        <p className="text-gray-500">{user.nickName}</p>
        <p className="text-gray-400 text-sm mt-1">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-xl uppercase mt-4">
           {user.roles.join(", ")}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {isAuthorOrAdmin && (
            <Link
              href="/write"
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md transition"
            >
              Make a Post
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
