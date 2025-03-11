import Cookies from "js-cookie";
const { fetchData } = require("./api");
const TOKEN_KEY = "auth_token";


export async function login(name, password) {
    try {
      // 🔥 Étape 1 : Récupérer le token CSRF
      await fetchData("/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });
  
      // 🔥 Étape 2 : Envoyer la requête de connexion
      const res = await fetchData("/login", {
        method: "POST",
        credentials: "include", // ✅ Envoie les cookies pour Sanctum
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: name, Password: password }),
      });
      console.log("res", res);
      if (!res.ok) {
        throw new Error(`Erreur HTTP! Statut: ${res.status}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error("Erreur API:", error);
      return null;
    }
  }
  

// ✅ Sauvegarde le token dans les cookies
export function setAuthToken(token) {
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: "Strict" });
}

// ✅ Récupère le token depuis les cookies
export function getAuthToken() {
  return Cookies.get(TOKEN_KEY);
}

// ✅ Supprime le token (lorsque la PWA est fermée)
export function removeAuthToken() {
  Cookies.remove(TOKEN_KEY);
}

