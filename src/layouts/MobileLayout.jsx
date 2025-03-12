"use client";
import { useAuth } from "@/context/AuthProvider";

export default function MobileLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-500 text-white py-4 text-center">
        <h1>Bienvenue, {user?.Name} 👋</h1>
      </header>
      <main className="flex flex-col items-center p-4 w-full">
        {children}
      </main>
      <footer className="w-full bg-gray-800 text-white py-2 text-center">
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Déconnexion</button>
      </footer>
    </div>
  );
}
