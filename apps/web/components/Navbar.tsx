"use client";
import Link from "next/link";
import useAuthStore from "@/store/useStore";
import useLogout from "@/hooks/useLogout";

export function Navbar(): JSX.Element {
  const { isAuthenticated } = useAuthStore();
  const logout = useLogout();

  return (
    <header className="mx-auto dark:bg-background p-6 border-b w-full bg-emerald-600">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-black font-bold text-gray-900">
          <Link href="/" className="text-2xl font-semibold text-yellow-500">
            Canvas
          </Link>
        </h1>
        <div className="hidden md:flex justify-center items-center space-x-6">
          {isAuthenticated ? (
            <button
              className="text-sm bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors items-center"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/signup"
              className="text-sm bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors items-center"
            >
              Join now
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
