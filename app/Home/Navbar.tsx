"use client";
import Link from "next/link";
import { LogOut, Target } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { useLogout } from "../api/use.logout";

export default function Navbar() {
  const { authenticated } = useAuth();

  console.log("auth", authenticated);
  const logout = useLogout();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="h-full flex items-center">
          <Link href="/" className="flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-300" />
            <h1 className="text-xl text-white font-semibold">Issue Tracker</h1>
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300 text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300 text-lg">
              About
            </Link>
          </li>
          {!authenticated && (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-300 text-lg">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-300 text-lg">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        {authenticated && (
          <button onClick={logout} className="hover:text-red-400">
            <LogOut size={24} />
          </button>
        )}
      </div>
    </nav>
  );
}
