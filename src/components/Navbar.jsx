"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/navigation/home", label: "Inicio" },
    { href: "/navigation/personajes", label: "Personajes" },
    { href: "/navigation/favoritos", label: "Favoritos" },
    { href: "/navigation/mapa", label: "Mapa" },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">

        <Link href="/navigation/home" className="text-2xl font-bold text-blue-400">
          Rick & Morty App
        </Link>

        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>


        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 px-4 rounded md:py-0 md:px-0 ${
                pathname === link.href
                  ? "bg-blue-500 md:bg-transparent text-blue-300"
                  : "hover:text-blue-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
