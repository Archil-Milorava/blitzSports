"use client";

import { userAtom } from "@/state/UserState";
import { useAtom } from "jotai";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {  useState } from "react";

const NavbarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAtom(userAtom)




  const avatar = user?.avatar;  

  const navItems = [
    { href: "/football", label: "ფეხბურთი" },
    { href: "/mma", label: "MMA" },
    { href: "/f1", label: "ფორმულა 1" },
    { href: "/other", label: "სხვა..." },
  ];

  return (
    <header className="bg-accent w-full h-14 sticky top-0 left-0 flex items-center justify-between px-4 md:px-[11rem] z-50">
      {/* Logo */}
      <Link
        href="/"
        className="bg-secondary text-primary tracking-widest px-2 py-0.5 md:text-2xl font-semibold hover:text-secondary hover:bg-primary cursor-pointer transition-all"
      >
        BLITZ
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 ">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white hover:text-primary transition-all font-semibold tracking-wide"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Avatar */}
      <div className="hidden md:block">
        <Link href={user ? "/profile" : "/auth"}>
          {user ? (
            <Image
              src={avatar || "/avatar.png"}
              alt="avatar"
              width={96}
              height={96}
              className="w-8 h-8 overflow-hidden rounded-full hover:opacity-80 transition-all "
            />
          ) : (
            <User className="text-white hover:opacity-90" /> 
          )}
        </Link>
      </div>

      {/* Mobile Burger Button */}
      <div className="md:hidden flex items-center gap-3">
        {/* Avatar for Mobile */}
        <Link href={user ? "/profile" : "/auth"}>
          {user ? (
            <Image
              src={avatar || "/avatar.png"}
              alt="avatar"
              width={96}
              height={96}
              className="w-8 h-8 overflow-hidden rounded-full"
            />
          ) : (
            <User className="text-primary hover:opacity-90" />
          )}
        </Link>

        {/* Burger */}
        <button
          className="flex flex-col justify-center items-center w-8 h-8 relative cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={`bg-white h-0.5 w-6 rounded-sm transition-all ${
              isMenuOpen ? "rotate-40 translate-y-2" : ""
            }`}
          />
          <span
            className={`bg-white h-0.5 w-6 rounded-sm transition-all my-1 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`bg-white h-0.5 w-6 rounded-sm transition-all ${
              isMenuOpen ? "-rotate-40 -translate-y-1" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full bg-accent z-40 md:hidden shadow-lg transition-all duration-1000 cursor-pointer">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-white text-sm tracking-widest hover:text-primary transition-all cursor-pointer w-full text-center py-2"
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavbarMain;
