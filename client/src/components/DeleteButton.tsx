"use client";

import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DeleteButtonProps = {
  articleId: string;
};

export default function DeleteButton({ articleId }: DeleteButtonProps) {
  const router = useRouter();
    const baseUrl = getApiBaseUrl();

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
  


  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${baseUrl}/article/delete/${articleId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Article deleted successfully!");
        router.push("/"); 
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

if (!canEdit) return null;

  return (
    <button
      onClick={handleDelete}
      className="w-16 py-2 text-sm bg-red-600 text-white rounded hover:opacity-80 cursor-pointer transition-all"
    >
      Delete
    </button>
  );
}
