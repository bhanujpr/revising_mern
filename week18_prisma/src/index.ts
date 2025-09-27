import {PrismaClient} from "@prisma/client"

const client = new PrismaClient();

async function createUSer(){

    await client.user.create({
        data:{
            username:"Bhanu",
            password:"hahaha",
            age:10,
            city:"jaipur"
        }
    })
}


async function giveUserWithTodo(){
    const user = await client.user.findFirst({
        where:{
            id:1
        },
        include:{
            todos:true
        }
    })
    console.log(user)
}
// createUSer();
giveUserWithTodo();