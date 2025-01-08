import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email : credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID, // Ajoutez ceci dans votre .env
      clientSecret: process.env.DISCORD_CLIENT_SECRET, // Ajoutez ceci dans votre .env
    }),
  ],
  callbacks: {
    session: ({ session, token}) => {
      console.log('Session Callback', {session,token})
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      }
    },
    jwt: ({ token,user }) => {
      console.log('JWT Callback', {token,user})
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          role: u.role
        }
      } 
      return token
    },
    async signIn({ account, profile, credentials }) {
      // Cas pour DiscordProvider
      if (account.provider === 'discord' && profile?.email) {
        const user = await prisma.user.upsert({
          where: { email: profile.email },
          create: {
            email: profile.email,
            name: profile.username || profile.email.split('@')[0],
            role: 'USER', // Rôle par défaut
          },
          update: {
            name: profile.username || profile.email.split('@')[0],
          },
        });
    
        return !!user; // Permet la connexion si l'utilisateur a été traité avec succès
      }
    
      // Cas pour CredentialsProvider
      if (account.provider === 'credentials') {
        return true; // Laisser le CredentialsProvider gérer la logique via `authorize`
      }
    
      // Bloque les autres cas par défaut
      return false;
    }
  }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }