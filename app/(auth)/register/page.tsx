'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { RegisterForm } from "./form";  // Gardez votre formulaire d'enregistrement habituel

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl p-6 rounded-xl sm:bg-white">
        <h1 className="font-semibold sm:text-center text-2xl sm:text-4xl mb-8">Create your account</h1>

        {/* Formulaire d'inscription personnalisé */}
        <RegisterForm />
        
        {/* Discord Sign In Button */}
        <div className="flex items-center my-6">
          <hr className="border-t border-gray-300 flex-grow" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="border-t border-gray-300 flex-grow" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}  // Redirection après la connexion réussie
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <img 
              src="/discord-icon.svg" 
              alt="Discord Icon" 
              className="w-6 h-6 mr-2" 
            />
            Sign Up with Discord
          </button>
        </div>

        {/* Lien vers la page de connexion si l'utilisateur a déjà un compte */}
        <p className="text-center py-6">
          Have an account?{" "}
          <Link className="text-red-500 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
