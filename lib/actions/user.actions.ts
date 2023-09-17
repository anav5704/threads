"use server"

import { revalidatePath } from "next/cache"
import { start } from "../mongoose"
import User from "../models/user.model"
// import mongoose from "mongoose"
// const User = mongoose.model("User")

interface Params {
    id: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({  
    id, 
    username, 
    name, 
    bio, 
    image, 
    path
}: Params ): Promise <void> {
    try {
        start()
        await  User.findOneAndUpdate({id}, { username: username.toLowerCase(), name, bio, image, boarded: true}, {upsert: true})
        if (path === "/profile/edit"){
            revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to create / update user: ${error.message}`)
    }
}

export async function fetchUser(id: string){
    try {
        start()
        return await User.findOne({id})
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}