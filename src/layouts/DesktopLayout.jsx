"use client";
import { useAuth } from "@/context/AuthProvider";

export default function DesktopLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white p-4">
        <h1 className="text-2xl font-bold">Bienvenue, {user?.Name} 👋</h1>
        <button onClick={logout} className="mt-4 bg-red-500 px-4 py-2 rounded">Déconnexion</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
