import { getServerSession } from "next-auth"




//server side rendering so not good
// "use client"
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";


// export default function Home() {
//   return (
//     <SessionProvider>
//       <SasteHome/>
//     </SessionProvider>
    
//   );
// }

// function SasteHome(){
//   const session = useSession();
//   return <div>
//     {session.status==="authenticated" && <button onClick={()=>signOut()}>Logout</button>}
//     {session.status==="unauthenticated" && <button onClick={()=>signIn()}>Login</button>}
//   </div>
// }



//better option it is server side rendering
export default async function Home(){
  const session = await getServerSession();
  return(
    <div>{JSON.stringify(session)}</div>
  )
}
