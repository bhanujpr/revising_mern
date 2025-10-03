import {z} from 'zod';
export const SignUpSchema=z.object({
    email:z.email(),
    username:z.string().min(3),
    password:z.string(),
    name:z.string(),
    photo:z.string()
})


export const SignInSchema=z.object({
    username:z.string().min(3),
    password:z.string()
})
export const CreateRoomSchema=z.object({
    slug:z.string().min(3)
})