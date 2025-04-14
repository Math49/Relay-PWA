import { getAuthToken } from "@/services/auth";
const API_BASE_URL = "https://relay-api.mathis-mercier.mds-angers.yt/api"; // Remplace par l'URL de ton API
// 🔥 Fonction générique pour appeler l'API
export async function fetchData(endpoint, options = {}) {
  try {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    return null;
  }
}
