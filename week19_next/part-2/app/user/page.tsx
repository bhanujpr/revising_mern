import axios from 'axios';
async function getUserDetails() {

    // CONST [loader , setLoader] = useState();
    // const response = await axios.get("/api/v1/user/details")
    const response = await axios.get("http://localhost:3000/api/v1/user/details")
    console.log(response.data)
    return response.data;
}


export default async function User(){
    const data = await getUserDetails();
    // await new Promise((r)=>setTimeout((r),5000))
    return <div>
        {data.user}
        {data.email}
    </div>
}