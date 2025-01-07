'use client'

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export const LoginForm = () => {
    const router  = useRouter()
    const seachParams = useSearchParams();
    const callbackUrl = seachParams.get('callbackUrl') || '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl
        }) 
        if (!res?.error) {
            router.push(callbackUrl)
        } else {
            setError('Invalid email or password')
        }
    }catch (err: any) { 

     }   
    }

    return(
        <form onSubmit={onSubmit} className="space-y-8 w-full sm:w-[400px]">

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
                <Button className="w-full bg-red-800">Login</Button>
            </div>
        </form>
    )
}