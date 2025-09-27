const express = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET="Bhanu123";

const app=express();

const users=[];

app.use(express.json())

app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.possword;

    users.push({
        username,
        password
    })

    res.json('signed up bro');
})
app.post("/signin",(req,res)=>{
    
    const username=req.body.username;
    const password=req.body.possword;

    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username&&users[i].password===password){
            foundUser=users[i];
        }
    }

    if(foundUser){
        const token=jwt.sign({
            username
        },JWT_SECRET)

        res.send({
            token:token
        })
    }
    else{
        res.send("Invalid credential")
    }
    
})
app.get("/me",(req,res)=>{
    const token=req.headers.authorization
    const decodedData=jwt.verify(token,JWT_SECRET);
    
    // const decodedData=jwt.decode(token);=>security vulnerability

    if(decodedData){
        let foundUser=null
         for(let i=0;i<users.length;i++){
            if(users[i].username===decodedData.username){
                foundUser=users[i];
            }
        }

    res.send({
        username:foundUser.username
    })
    }
})


app.listen(3000)