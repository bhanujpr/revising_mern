import express from "express"
import { authMiddleware } from "./middleware.js";
import {PrismaClient} from"@prisma/client"
const prisma=new PrismaClient();

const router = express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
    console.log(req.id)
    const data=await prisma.user.findUnique({
        where:{
            id:req.id
        }
    })
    const accountNumber=data.accountNumber;
    const accountData=await prisma.account.findUnique({
        where:{
            accountNumber:accountNumber
        }
    })
    console.log(data);
    res.json({
        balance:accountData.balance
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const data=await prisma.user.findUnique({
        where:{
            id:req.id
        }
    })
    const accountFrom=data.accountNumber;
    const accountTo=req.body.to;
    const amount = req.body.amount;

    const success =await prisma.$transaction(async(tx)=>{
        const user1=await prisma.account.findUnique({where:{accountNumber:accountFrom}});
        const user2=await prisma.account.findUnique({where:{accountNumber:accountTo}});
        console.log("before deduction acc1 " + user1.balance + " acc2 " + user2.balance)

        let user1Bal=user1.balance - amount;
        let user2Bal=user2.balance + amount;

        
        console.log("after deduction acc1 " + user1.balance + " acc2 " + user2.balance)


        await tx.account.update({
            where:{
                accountNumber:accountFrom
            },
            data:{
                balance:user1Bal
            }
        })

        await tx.account.update({
            where:{
                accountNumber:accountTo
            },
            data:{
                balance:user2Bal
            }
        })
    })

    res.json({
        message:"transfer successfulle "
    })

})


export{router};