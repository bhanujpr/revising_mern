import NextAuth from "next-auth"
import { NextRequest } from "next/server"
import  CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from"next-auth/providers/google";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "mail",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Enter Your username" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const username = credentials?.username;
      const password = credentials?.password;
      console.log(username)

      //db request to check username and password
    //   lets db give the following details later we will hit db 
      const user={
        name:"hahrhh",
        id:"1",
        username:"kakak",
      }
      if(user){
        return user;
      }
      else{
        return null;
      }
    }
  }),
   GoogleProvider({
    clientId:"helllo",
    clientSecret:"heheh"
  })
    ]
})


// oldmethod
// export  const GET = function(req:NextRequest){
    
// }
// export  const POST = function(req:NextRequest){

// }

export { handler as GET , handler as POST}