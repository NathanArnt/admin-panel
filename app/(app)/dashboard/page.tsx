import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Link from "next/link";

  
export default async function Dashboard () {
    const session = await getServerSession(authOptions);

     // Si la session est inexistante, on affiche un message indiquant que l'utilisateur doit se connecter
    if (!session) {
        throw new Error ('Unauthorized')
    }
    return (
        <div>
            <button><Link href="/">Home</Link></button>       
            {session.user.role === 'ADMIN' ? (
                <div>
                    <p>Admin Dashboard</p>
                    <p>Bienvenue sur le dashboard de ton compte administrateur {session.user?.name}</p>
                    <p>Voici ton adresse mail : {session.user?.email}</p>
                </div>
            ) : session.user.role === 'USER' ?(
                <div>
                    <p>User Dashboard</p>
                    <p>Bienvenue sur le dashboard de ton compte utilisateur {session.user?.name}</p>
                    <p>Voici ton adresse mail : {session.user?.email}</p>
                </div>
            ) : (
                <div>
                    <p>Unauthorized</p>
                </div>
            )}
        </div>
    )
}