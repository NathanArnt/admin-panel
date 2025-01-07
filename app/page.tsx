import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import Link from "next/link";
import { LoginButton, LogoutButton } from "./auth";
  
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="">
      <div className="flex justify-between items-center flex-col p-10">
        <button className="pb-8 hover:transform hover:scale-125"><Link href="/login">Login</Link></button>
        <button className="hover:transform hover:scale-125"><Link href="/register">Register</Link></button>
        <div className="py-8 hover:transform hover:scale-125"><LoginButton></LoginButton></div>
        <div className="hover:transform hover:scale-125"><LogoutButton></LogoutButton></div>
      </div>
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </div>
  );
}
