'use client'

import Link from "next/link";
import { LoginForm } from "./form";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl p-6 rounded-xl sm:bg-white">
        <h1 className="font-semibold sm:text-center text-2xl sm:text-4xl mb-8">Login</h1>
        
        {/* Existing Login Form */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="border-t border-gray-300 flex-grow" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="border-t border-gray-300 flex-grow" />
        </div>

        {/* Discord Login Button */}
        <div className="flex justify-center">
          <button
            onClick={() => signIn("discord", { callbackUrl: "/" })}
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          > 
            Login with Discord
          </button>
        </div>

        <p className="text-center py-6">
          Create an account?{" "}
          <Link className="text-red-500 hover:underline" href="/register">
            Go
          </Link>
        </p>
      </div>
    </div>
  );
}
