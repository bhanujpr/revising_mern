import express from "express"
const app=express();

app.get("/signup",(req,res)=>{
    res.send("heello")
})

app.get("/signin",(req,res)=>{
    res.send("heello")
})

app.get("/chat",(req,res)=>{
    res.send("heello")
})


app.listen(3001)