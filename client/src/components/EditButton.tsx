"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const EditButton = ({ articleId }: { articleId: string }) => {
  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    try {
      const user = JSON.parse(userData);
      const roles: string[] = user.roles || [];
      if (roles.includes("admin") || roles.includes("author")) {
        setCanEdit(true);
      }
    } catch (error) {
      setCanEdit(false);
    }
  }, []);

  if (!canEdit) return null;
  return (
      <Link
        href={`/edit/${articleId}`}
        className="w-16 py-2 rounded-sm text-sm tracking-wider flex items-center justify-center  bg-yellow-500 hover:opacity-80 transition-all cursor-pointer"
      >
        Edit
      </Link>
  );
};

export default EditButton;
