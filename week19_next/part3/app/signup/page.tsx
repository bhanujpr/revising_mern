"use client"

import axios from "axios"
import { useRef } from "react"
import { useRouter } from "next/navigation";

export default function Signup(){
    const router = useRouter()
    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2">
                <input type="text" ref={usernameRef} placeholder="Username" />
                <input type="text" ref={passwordRef} placeholder="password" />
                <button 
                className="bg-amber-100 text-black"
                onClick={async()=>{
                    // console.log(usernameRef.current?.value)
                    await axios.post("http://localhost:3000/api/v1/signup",{
                        //@ts-ignore
                        username:usernameRef.current.value,
                        //@ts-ignore
                        password:passwordRef.current.value
                    })
                    router.push('/signin')
                }}>Sign up</button>
            </div>

        </div>
    )
}