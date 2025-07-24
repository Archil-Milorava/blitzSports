import HeroMain from "@/features/hero/HeroMain";
import NavbarMain from "@/features/navbar/NavbarMain";
import React from "react";

const page = () => {
  return (
    <main className=" w-full h-[200vh] overflow-hidden">
      <NavbarMain />
      <HeroMain />
    </main>
  );
};

export default page;
