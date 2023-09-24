"use server"

import { revalidatePath } from "next/cache"
import { start } from "../mongoose"
import User from "../models/user.model"
import { FilterQuery, SortOrder, _FilterQuery } from "mongoose"
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

interface PropsTwo {
    userId: string, 
    query?: string, 
    pageNumber?: number, 
    pageSize?: number, 
    sortBy?: SortOrder, 
}

export async function fetchUsers({ userId, query = "",pageNumber = 1, pageSize = 20, sortBy = "desc"}: PropsTwo){
    const skipAmount = (pageNumber - 1) * pageSize

    try {
        start()
        const regex = new RegExp(query, "i")
        const allUsers: FilterQuery<typeof User> = {id: {$ne: userId}}

        if(query.trim() !== ""){
            allUsers.$or = [{username: {$regex: regex}}, {name: {$regex: regex}}]
        }

        const sortOptions = { createdAt: sortBy}
        const userQuery = User.find(allUsers).sort(sortOptions).skip(skipAmount).limit(pageSize)
        const totalUserCount = await User.countDocuments(allUsers)
        const users = await userQuery.exec()
        const isNext = totalUserCount > skipAmount + users.length

        return { users, isNext }

    } catch (error: any) {
        throw new Error(`Failed to fetch all users: ${error.message}`)
    }
}