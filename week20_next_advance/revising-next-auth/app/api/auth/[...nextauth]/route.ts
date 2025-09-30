import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
        providers: [
                CredentialsProvider({
                    name: "Email",
                    credentials: {
                    username: { label: "Username", type: "text", placeholder: "someone@gmail.com" },
                    password: { label: "Password", type: "password" }
                    },
                    async authorize(credentials, req) {
                        
                    const username = credentials?.username;
                    const password = credentials?.password;
                    console.log(username)

                    const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                    if (user) {
                        return user
                    } else {
                        return null
                        }
                    }
                })
            ],
            secret:process.env.NEXTAUTH_SECRET
})

export {handler as GET , handler as POST};