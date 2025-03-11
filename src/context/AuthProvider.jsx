"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, removeAuthToken } from "@/services/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login"); // 🔥 Redirige si pas de token
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Fonction de déconnexion
  const logout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook pour utiliser l'auth partout
export function useAuth() {
  return useContext(AuthContext);
}
 