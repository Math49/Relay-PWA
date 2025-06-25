"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, setAuthToken, removeAuthToken, login as authLogin } from "@/services/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAuthToken());
  const router = useRouter();

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const login = async (name, password) => {
    const res = await authLogin(name, password);
    if (res && res.token) {
      setAuthToken(res.token);
      setUser(res.user);
      setToken(res.token);

      localStorage.setItem("user", JSON.stringify(res.user));

      router.push("/");
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
