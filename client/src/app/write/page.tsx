"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/features/TipTap/RichTextEditor";
import { getApiBaseUrl } from "@/utils/getBaseUrl";

const Page = () => {
  const baseUrl = getApiBaseUrl();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const [title, setTitle] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [category, setCategory] = useState("football");
  const [section, setSection] = useState("news");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setIsAuthorized(false);
      return;
    }

    try {
      const user = JSON.parse(userData);
      const roles: string[] = user.roles || [];

      if (roles.includes("admin") || roles.includes("author")) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch {
      setIsAuthorized(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("You must be logged in to post an article");
      return;
    }

    const user = JSON.parse(userData);

    setIsSubmitting(true);

    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

    const imageUrl = file ? await toBase64(file) : "";    

    try {
      const res = await fetch(`${baseUrl}/article/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: editorContent,
          badge: section,
          category,
          author: user.id,
          twitterLink,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to create article");

      alert("Posted successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error posting article");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking role
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking access...
      </div>
    );
  }

  // If unauthorized
  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-600">
          You are not allowed to access this page.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
        >
          Go Home
        </button>
      </div>
    );
  }



  return (
    <form
      onSubmit={handleSubmit}
      className={`min-h-screen w-full my-[4rem] md:px-[10rem] flex flex-col gap-6 px-4 ${isSubmitting && "opacity-20 animate-pulse"}`}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">დაწერე სტატია</h1>

      {/* Featured Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <input
        required
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          კატეგორია
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border bg-white"
        >
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="mma">MMA</option>
          <option value="f1">Formula 1</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          სექცია
        </label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border bg-white"
        >
          <option value="news">News</option>
          <option value="history">History</option>
        </select>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          სათაური
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border"
          placeholder="Enter post title"
          required
        />
      </div>

      {/* Twitter Link */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Twitter Link
        </label>
        <input
          type="text"
          value={twitterLink}
          onChange={(e) => setTwitterLink(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border"
          placeholder="https://twitter.com/..."
        />
      </div>

      {/* Rich Text Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          სტატია
        </label>
        <RichTextEditor onContentChange={setEditorContent} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex cursor-pointer justify-center rounded-md border border-transparent 
          bg-violet-600 py-2 px-4 text-sm font-medium text-white shadow-sm 
          hover:bg-violet-700 focus:outline-none focus:ring-2 
          focus:ring-violet-500 focus:ring-offset-2 self-end mt-4
          ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
};

export default Page;
