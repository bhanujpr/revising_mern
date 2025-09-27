// let x: number = 1;
// x="Bhanu";
// console.log(x);

// function greet(name:string){
//     console.log(`Hello ${name}`)
// }

// // greet("harkirat")

// function sum(num:number,num2:number):number{
//     return num+num2;
// }

// // console.log(sum(10,11));

// function isLegal(age:number):boolean{
//     if(age>18)return true;
//     else return false;
// }

// console.log(isLegal(10));

// function afterOneSec(fn:()=>void){
//     setTimeout(fn,1000);
// }

// function fn(){
//     console.log("hello")
// }

// afterOneSec(fn);


// function afterOneSec(fn:()=>void){
//     setTimeout(fn,1000);
// }
// afterOneSec(()=>{
//     console.log(sum(10,11))
// });

// function greet(user:{
//     name:string,
//     age:20
// }){
//     console.log(user.name)
// }

// greet({name:"Bhanu",age:20});





// interface userType{
//     name:string,
//     lastname:string,
//     age:number
// }

// function greet(user:userType){
//     console.log(`Hello ${user.name }`)
// }

// let user:userType={
//     name:"Bhanu",
//     lastname:"Pratap",
//     age:20
// }

// greet(user)


interface todoType{
    title:string,
    description:string,
    done:boolean
}

let todo:todoType={
    title:"Go to gym",
    description:"Go gym and work 24*7 hardle",
    done:false
}

function showTodo(todo:todoType){
    console.log(`Hey your todo is ${todo.title} and you have to ${todo.description} and is ${todo.done?"not done yet":"done bro"}`)
}
// showTodo(todo);

interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filter(users:User[]){
    users.forEach(user => {
    if (user.age > 18) {
      console.log(`${user.firstName} is valid`);
    }
  });
}


filter([
    {
        firstName:"Bhanu",
        lastName:"pratap",
        age:20
    },
    {
        firstName:"Bhanu2",
        lastName:"pratap",
        age:2
    },
    {
        firstName:"Bhanu3",
        lastName:"pratap",
        age:218
    },
    {
        firstName:"Bhanu4",
        lastName:"pratap",
        age:19
    },
])