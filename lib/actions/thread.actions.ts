"use server"

import { revalidatePath } from "next/cache"
import { start } from "../mongoose"
import User from "../models/user.model"
import Thread from "../models/thread.model"
import Community from "../models/community.model"

interface Params {
    text: string,
    author: string
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        start()
        const communityIdObject = await Community.findOne(
            { id: communityId },
            { _id: 1 }  
          )

        const createdThread = await Thread.create({ text, author, community: communityId })

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })

        if (communityIdObject) {
            await Community.findByIdAndUpdate(communityIdObject, {
              $push: { threads: createdThread._id },
            });
          }

        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create new thread: ${error}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    const skipAmount = (pageNumber - 1) * pageSize
    try {
        start()

        const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ "createdAt": "desc" }).skip(skipAmount).limit(pageSize)
            .populate({ path: "author", model: User })
            .populate({
                path: "children",
                populate: { path: "author", model: User, select: "_id name parentId image" }
            })

        const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })
        const posts = await postQuery.exec()
        const isNext = totalPostCount > skipAmount + posts.length
        return { posts, isNext }

    } catch (error: any) {
        throw new Error(`Failed to get threads: ${error}`)
    }
}

export async function fetchThreadById(id: string){
    try {
        start()
        const thread =  await Thread.findById(id)
        .populate({path: "author", model: User, select: "_id id name image"}) 
        .populate({path: "children", 
        populate: [
            {
                path: "author", model: User, select: "_id name parentId image"
            },
            {
                path: "children", model: Thread, populate: {
                    path: "author", model: User, select: "_id name parentId image"
                }
            }]
        }).exec()

        return thread
        
    } catch (error: any) {
        throw new Error(`Failed to get thread: ${error}`)
    }
}   

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string){
    try {
        start()
        const originalThread = await Thread.findById(threadId)
        if(!originalThread){
            throw new Error("Thread not found")
        }

        const commentThread = new Thread({
            text: commentText, 
            author: userId,
            parentIt: threadId
        })

        const savedCommentThread = await commentThread.save()
        originalThread.children.push(savedCommentThread._id)
        await originalThread.save()

        revalidatePath(path)
        
    } catch (error: any) {
        throw new Error(`Failed to add comment: ${error}`)
    }
}

export async function fetchUserPosts(userId: string){
    try {
        start()
        const threads = await User.findOne({id: userId})
        .populate({
            // populate commmunity
            path: "threads",
            model: Thread,
            populate: {
                path: "children", 
                model: Thread, 
                populate: {
                    path: "author",
                    model: User, 
                    select: "name image id"
                }
            }
        })
        
        return threads
        
    } catch (error: any) {
        throw new Error(`Failed to get user threads: ${error}`)
    }
}
