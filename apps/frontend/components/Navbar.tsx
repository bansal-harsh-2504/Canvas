"use client";
import Link from "next/link";
import useAuthStore from "@/store/useStore";
import useLogout from "@/hooks/useLogout";
import { Shapes } from "lucide-react";
import React from "react";

export function Navbar(): React.JSX.Element {
  const { isAuthenticated } = useAuthStore();
  const logout = useLogout();

  return (
    <header className="mx-auto dark:bg-background p-6 border-b w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <nav className="flex justify-between items-center px-[80px]">
        <h1 className="text-2xl dark:text-black font-bold text-gray-900">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <Shapes className="w-8 h-8" />
            <span className="text-3xl font-bold">Canvas</span>
          </Link>
        </h1>
        <div className="hidden md:flex justify-center items-center space-x-6">
          {isAuthenticated ? (
            <button
              className="cursor-pointer px-4 py-2 bg-white text-indigo-600 rounded-md font-medium text-md hover:bg-opacity-90 transition"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link href="/signup">
              <button className="cursor-pointer px-4 py-2 bg-white text-indigo-600 rounded-md font-medium text-md hover:bg-opacity-90 transition">
                Join now
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
