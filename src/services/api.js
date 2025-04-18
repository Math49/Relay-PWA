import { getAuthToken } from "@/services/auth";
// const API_BASE_URL = "http://127.0.0.1:8000/api";
const API_BASE_URL = "https://relay-api.mathis-mercier.mds-angers.yt/api";
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
