const API_BASE_URL = "http://127.0.0.1:8000/api"; // Remplace par l'URL de ton API

// 🔥 Fonction générique pour appeler l'API
export async function fetchData(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    console.log("path", `${API_BASE_URL}${endpoint}`);
    console.log("res", res);

    return res;
  } catch (error) {
    console.log("path", `${API_BASE_URL}${endpoint}`);
    console.error("Erreur API:", error);
    return null;
  }
}
