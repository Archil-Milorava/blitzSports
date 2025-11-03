"use client";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CredentialResponse } from "@react-oauth/google";
import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { useAtom } from "jotai";
import { userAtom } from "@/state/UserState";

const Page = () => {
  const BASE_URL = getApiBaseUrl();
  const router = useRouter();
  const [, setUser] = useAtom(userAtom)

  const handleSuccess = async (response: CredentialResponse) => {
    const token = response.credential;

    try {
      const res = await axios.post(`${BASE_URL}/auth/google`, {
        token,
      });
      const user = res.data;
      setUser(user)
      router.push("/");
    } catch (err) {
      console.error("Auth error:", err);
    }
  };



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
