// "use client"
import axios from "axios"
// import { useEffect, useState } from "react"

export default async function Profile(){
    // const [pfp,setPfp]=useState("");
    //invalid way as this is client component 
    //invalid as 1st req does not carry header so wrong way nd server component does not have access to ur local storage
    //client side
    // useEffect(()=>{
    //     axios.get("http://localhost:3000/api/profile",{
    //         headers:{
    //             authorization:localStorage.getItem("token")
    //         }
    //     }).then(res=>{
    //         setPfp(res.data.hello)

    //     })
    // },[])


    //server side
        const res = await axios.get("http://localhost:3000/api/profile",{
            headers:{
                //but we dnt have access to this as 1st request goes from browser not js in our page 
                authorization:"hahahhaa"
            }
        })
        const pfp = res.data.pfp


    return <div>
{pfp}
    </div>
}