"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black shadow-md sticky top-0 z-50 border-t border-b border-gray-400">
      <h1 className="text-2xl font-bold text-indigo-600">Artistly</h1>
      <nav className="space-x-6">
        <Link href="/" className="text-white-700 hover:text-indigo-600">
          Home
        </Link>
        <Link href="/artists" className="text-white-700 hover:text-indigo-600">
          Explore Artists
        </Link>
        <Link href="/onboard" className="text-white-700 hover:text-indigo-600">
          onboard
        </Link>
      </nav>
    </header>
  );
}
