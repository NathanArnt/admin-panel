'use client'

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { signIn } from "next-auth/react"
// import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const RegisterForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>('')
    const router = useRouter()
    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('api/register', {
                method: 'POST',    
                body: JSON.stringify({
                    name,email,password
                }),
            })
            if (res.ok) {
                router.push('/')
            }
            else {
                setError((await res.json()).error)
            }
        } catch (error: any){
            setError(error?.message)
        }

        console.log("Registered !")
    }
    return (
        <form onSubmit={onSubmit} className="space-y-8 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" id="name" placeholder="Name" />
            </div>

            <div className="grid w-full items-center gap-1.5 ">
                <Label htmlFor="email">Email</Label>
                <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" id="email" placeholder="Email" />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" id="password" placeholder="Password" />
            </div>
            {error && <Alert>{error}</Alert>}
            <div>
                <Button className="w-full bg-red-800">Register</Button>
            </div>
        </form>
    )
}