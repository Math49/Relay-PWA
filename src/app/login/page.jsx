"use client";
import { useEffect, useState } from "react";
import { getAuthToken, login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    login(e.target[0].value, e.target[1].value)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        setError("Identifiants incorrects !");
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-[100vh] w-[100vw] py-[5vh] md:px-[5vw]">
      <div className="flex items-center justify-center w-[80%] h-[30%] C-text-white">
        <div className="flex flex-col items-center justify-center w-[100%] h-[90%] gap-6 md:gap-10">
          <img
            src="/images/elements/logo-relay.svg"
            className="w-auto h-[10vh] md:h-[20vh]"
          />
          <h1 className="font-extrabold text-4xl md:text-5xl">
            Relay - Réassort
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-[80%] h-[70%]">
        <div className="flex flex-col items-center justify-around w-[100%] md:w-[50%] h-[100%] C-bg-white C-text-black rounded-[40px] gap-5 py-[5vh]">
          <h2 className="text-4xl font-extrabold">Bienvenue !</h2>
          <p className="text-2xl text-center">
            Connectez-vous au compte du magasin
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-around h-[50%] w-[80%] gap-5"
          >
            <div className="flex flex-col items-center justify-center w-[100%] gap-5">
              <input
                type="text"
                id="name"
                placeholder="Identifiant"
                className="w-full h-[50px] rounded-[20px] px-5 C-border-red-var2 C-shadow-red-var2 border-[1px]"
              />
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                className="w-full h-[50px] rounded-[20px] px-5 C-border-red-var2 C-shadow-red-var2 border-[1px]"
              />
            </div>
            <button
              type="submit"
              className="w-[100%] py-[1vh] C-bg-red C-text-white rounded-[20px] font-bold text-2xl"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
