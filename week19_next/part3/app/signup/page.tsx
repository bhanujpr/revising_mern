"use client"

import axios from "axios"
import { useRef } from "react"

export default function Signup(){
    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2">
                <input type="text" ref={usernameRef} placeholder="Username" />
                <input type="text" ref={passwordRef} placeholder="password" />
                <button 
                className="bg-amber-100 text-black"
                onClick={()=>{
                    // console.log(usernameRef.current?.value)
                    axios.post("http://localhost:3000/api/v1/signup",{
                        username:usernameRef.current.value,
                        password:passwordRef.current.value
                    })
                }}>Sign up</button>
            </div>

        </div>
    )
}