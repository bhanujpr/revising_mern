"use client"
import axios from "axios"

export default function(){
    return <div>
        <input type="text" />
        <input type="text" />
        <button onClick={async()=>{
            const res = await axios.post("http://localhost:3000/api/signin",{
                username:"hahaha",
                pasword:"bababah"
            })

            localStorage.setItem("token",res.data.token)
        }}>signin</button>
    </div>
}