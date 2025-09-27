const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt=require("jsonwebtoken")
const { auth, JWT_SECRET } = require("./auth");
const bcrypt = require('bcrypt');
const {z, parse} =require("zod")
const saltRounds = 10;



const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Bhanu_op:Bhanu%402003@web-dev-2.gndkcc0.mongodb.net/todo-app22")


const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

        const requiredBody=z.object({
            email:z.string().min(3).max(100).email(),
            name:z.string().min(3).max(100),
            password:z.string().min(5).max(30)
        })



        const parsedDataWithSucces=requiredBody.safeParse(req.body);

        if(!parsedDataWithSucces.success){
            res.json({
                message:"Wrong Format",
                error:parsedDataWithSucces.error
            })
            return
        }
        const email = req.body.email;
        const name = req.body.name;
        const myPlaintextPassword = req.body.password;

        if (!myPlaintextPassword) {
        return res.status(400).json({ message: "Password is required" });
        }

        // Hash password with 10 salt rounds
        const hash = bcrypt.hashSync(myPlaintextPassword, 10);

        await UserModel.create({
        name: name,
        email: email,
        password: hash
        });

        res.json({ message: "you are signed up" });
  
        // console.error("Signup Error:", err);   // 👈 log the real error
        res.status(500).json({ error: "Something went wrong" });
  
});




app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const myPlaintextPassword = req.body.password;

    
    
    const response = await UserModel.findOne({
        email: email,
    });
    
    
    // console.log(response)
    if(response){
       const userRight = bcrypt.compareSync(myPlaintextPassword,response.password);
       // console.log(response._id)
       if (userRight) {
           const token = jwt.sign({
               id: response._id.toString()
            },JWT_SECRET)
            
            res.json({
                token
            })
        } else {
            res.status(403).json({
                message: "Incorrect password"
            })
        }
    }
    else{
        res.json({
            message:"Wrong credentials"
        })
    }
});


app.post("/todo",auth ,async function(req, res) {
const userId=req.userId;

const title=req.body.title;
    await TodoModel.create({
        userId:userId,
        title:title,
        done:false
    })

res.json({
    message:"todo added successfully"
})
});


app.get("/todos",auth, async function(req, res) {
    const userId=req.userId;

    const todos = await TodoModel.find({
        userId:userId
    })
    res.send(todos)
   
});

app.listen(3000);