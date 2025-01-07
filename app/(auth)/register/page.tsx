import Link from "next/link";
import { RegisterForm } from "./form";

export default function RegisterPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl p-6 rounded-xl sm:bg-white ">
                <h1 className="font-semibold sm:text-center text-2xl sm:text-4xl mb-8">Create ur account</h1>
                <RegisterForm/>
                <p className="text-center py-6">Have an account ? <Link className=" text-red-500 hover:underline" href="/login">Sign In</Link></p>
            </div>
        </div>
        
    )
}