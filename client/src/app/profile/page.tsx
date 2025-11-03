"use client";

import { userAtom } from "@/state/UserState";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom)


  const handleLogout = () => {
    setUser(null)
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
  <Image
    src={user.avatar || "/avatar.png"}
    alt={user.fullName}
    width={96}
    height={96}
    className="rounded-full mx-auto border-4 border-violet-500 shadow-sm"
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
            <div className="w-full h-auto flex flex-col gap-2">

            <Link
              href="/write"
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md transition"
              >
              Make a Post
            </Link>
            <Link
              href="/cardgenerator"
              className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition"
              >
              Make a Card
            </Link>
              </div>
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
