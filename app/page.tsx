import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import Link from "next/link";
import { LogoutButton } from "./auth";
  
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="p-10 text-center max-w-96 my-0 mx-auto">
      <div className="flex justify-between items-center flex-col">
        <div className="flex justify-between items-center w-full mx-auto">
          <button className="hover:transform hover:scale-125"><Link href="/login">Login</Link></button>
          <button className="hover:transform hover:scale-125"><Link href="/register">Register</Link></button>
          <div className="hover:transform hover:scale-125"><LogoutButton></LogoutButton></div>
        </div>
        
      </div>
      {/* <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User /> */}
      <button><Link href="/dashboard">Dashboard</Link></button>
    </div>
  );
}
