"use client";
import imageCompression from "browser-image-compression";

export default function useImageCompressor() {
  const compressImage = async (file, label) => {
    if (!file) return null;
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      // Sauvegarde dans localStorage ou IndexedDB si besoin ici.
      // Pour l'instant on retourne juste le base64 comme preview.
      return base64; // Peut être remplacé par une URL persistée selon besoin.
    } catch (error) {
      console.error("Erreur compression image :", error);
      return null;
    }
  };

  return { compressImage };
}
