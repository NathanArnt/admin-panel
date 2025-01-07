import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()
        const hashed = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed
            }
        })

        return NextResponse.json({
            user: {
                email: user.email
            }
        })
    } catch (error) {
        console.error("Error during user registration:", error)

    }
}