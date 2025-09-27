import {Client} from 'pg'
import express from'express';

const app = express();

const client = new Client({
    connectionString:'postgresql://neondb_owner:npg_TesxEyD76BgW@ep-blue-band-adyai5fs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})
app.use(express.json())

client.connect()


app.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    try{
        const insertQuery=`Insert INTO users(username,email,password) VALUES( $1, $2 , $3);`
        const response = await client.query(insertQuery,[username,email,password]);
        console.log(response)
        res.json({
            message:"You are signed up",
            response
        })
    }catch(e){
        console.log(e);
        res.json({
            message:"error while signing up"
        })
    }
})


app.listen(3000)