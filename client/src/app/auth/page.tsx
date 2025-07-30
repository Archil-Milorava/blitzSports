"use client";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CredentialResponse } from "@react-oauth/google";

const Page = () => {
  const router = useRouter();

  const handleSuccess = async (response: CredentialResponse) => {
    const token = response.credential;

    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/google", {
        token,
      });
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex justify-center my-8">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </div>
  );
};

export default Page;
