const express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const JWT_SECRET = "USER_APP";

const users=[];

// function generateToken(length = 32) {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let token = '';
  
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * chars.length);
//     token += chars[randomIndex];
//   }
  
//   return token;
// }


app.post("/signup", (req, res) => {
    const username=req.body.username
    const password=req.body.password

    users.push({
        username,
        password
    });
    console.log(users)
    res.json({
        message:"Your work done"
    });

})
app.post("/signin", (req, res) => {
    
    const username=req.body.username
    const password=req.body.password
    
    const foundUser = users.find(u => u.username === username || u.password === password);
    if(foundUser){
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.send(token)
        console.log(users)
    }
    else{
        res.json({
            message:"Please signup first"
        })
    }

});
app.get("/me",(req,res)=>{
    const token=req.headers.authorization
    // const userDetails = jwt.verify(token, JWT_SECRET);
    
    
    try {
        const userDetails = jwt.verify(token, JWT_SECRET);
        console.log('Token is valid:');
        const username =  userDetails.username;
        const user = users.find(user => user.username === username);
    
        if(user){
            res.send(user.username)
            
        }
        else{
            res.status(403).send("Signup please")
        }
    } catch (err) {
        console.error('Token verification failed:', err.message);
        // Handle different error types, e.g.,
        if (err.name === 'TokenExpiredError') {
            console.error('Token has expired.');
        } else if (err.name === 'JsonWebTokenError') {
            console.error('Invalid token or signature.');
            res.send("Invalid token")
        }
    }
    
})

app.listen(3000);