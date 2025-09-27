const express = require('express')
const app=express();

app.use(function(req, res, next) {
    console.log(req.query.name)
    console.log("request received");
    res.send("not allowed bro")
    next();
})
app.get("/middleware",(req,res)=>{
    res.send('Hello')
})

app.get("/m",(req,res)=>{
    res.send('Hello1')
})

app.get("/midd",(req,res)=>{
    res.send('Hello2')
})
app.listen(3000);