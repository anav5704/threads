"use server"

import { revalidatePath } from "next/cache"
import { start } from "../mongoose"
import User from "../models/user.model"
import Thread from "../models/thread.model"
// import mongoose from "mongoose"
// const Thread = mongoose.model("Thread")

interface Params {
    text: string, 
    author: string
    communityId: string | null, 
    path: string
}

export async function createThread({text, author, communityId, path}: Params){
    try {
        start()
        const createdThead = await Thread.create({text, author, community: null})
    
        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThead._id}
        })
    
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create new thread: ${error}`)
    }
}    