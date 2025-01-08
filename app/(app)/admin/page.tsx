import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


const AdminPage = async () => {
    const session = await getServerSession(authOptions)
    if(session?.user.role !== 'ADMIN') {
        throw new Error ('Unauthorized')
    }
    return (
        <div>
            <p>Admin Dashboard</p>
        </div>
    )
}

export default AdminPage