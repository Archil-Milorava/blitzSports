"use client";

import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavbarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ avatar?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const avatar = user?.avatar;

  return (
    <main>
      <div className="bg-accent w-full h-14 top-0 fixed flex items-center justify-between px-4 md:justify-around z-50 ">
        <Link
          href={"/"}
          className="bg-primary pt-1 px-2  flex items-center justify-center text-2xl font-semibold tracking-wider"
        >
          BLITZ
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          <Link
            href={"football"}
            className="font-semibold text-white tracking-wider hover:text-secondary transition-all cursor-pointer"
          >
            ფეხბურთი
          </Link>
          <Link
            href={"basketball"}
            className="font-semibold text-white tracking-wider hover:text-secondary transition-all cursor-pointer"
          >
            კალათბურთი
          </Link>
          <Link
            href={"mma"}
            className="font-semibold text-white tracking-wider hover:text-secondary transition-all cursor-pointer"
          >
            MMA
          </Link>
          <Link
            href={"f1"}
            className="font-semibold text-white tracking-wider hover:text-secondary transition-all cursor-pointer"
          >
            ფორმულა 1
          </Link>
          <Link
            href={"other"}
            className="font-semibold text-white tracking-wider hover:text-secondary transition-all cursor-pointer"
          >
            სხვა...
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 ">
          <button className="bg-secondary p-1 hover:opacity-90 cursor-pointer ">
            <User size={20} color="white" />
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`bg-white block w-6 h-0.5 transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`bg-white block w-6 h-0.5 mt-1.5 transition-all ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-white block w-6 h-0.5 mt-1.5 transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop User Button */}
        {user ? (
          <Link href={"profile"}>
            <img
              src={avatar}
              alt="avatar"
              className="h-10 w-10 rounded-full overflow-hidden"
            />
          </Link>
        ) : (
          <Link
            href={"auth"}
            className="hidden md:block bg-secondary p-1 hover:opacity-90 cursor-pointer rounded-md"
          >
            <User size={20} color="white" />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full bg-accent z-40 md:hidden shadow-lg transition-all duration-1000">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-1">
              ფეხბურთი
            </li>
            <li className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-1">
              კალათბურთი
            </li>
            <li className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-1">
              MMA
            </li>
            <li className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-1">
              ფორმულა 1
            </li>
            <li className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-1">
              სხვა..
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default NavbarMain;
