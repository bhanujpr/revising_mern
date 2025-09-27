interface User{
    id:string,
    name:string,
    age:number,
    email:string,
    password:string
}

// interface UpdateProps{
//     name:string,
//     age:string,
//     password:string
// }

type UpdateProps=Pick<User,'name'|'age'|'email'>
function updateUser(updatedProps:UpdateProps){

}