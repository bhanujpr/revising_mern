import axios from "axios";


export default async function Blogpage({params}:any){
    const postId= (await params).postId;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = await response.data;
    return(
        <div>
            Blog page {postId}
            <br />
            title = {data.title}
            body = {data.body}
        </div>
    )
}