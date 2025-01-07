import Link from "next/link";
import { LoginForm } from "./form";

export default function LoginPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl p-6 rounded-xl sm:bg-white ">
                <h1 className="font-semibold sm:text-center text-2xl sm:text-4xl mb-8">Login</h1>
                <LoginForm/>
                <p className="text-center py-6">Create an account ? <Link className=" text-red-500 hover:underline" href="/register">Go</Link></p>
            </div>
        </div>
        
    )
}