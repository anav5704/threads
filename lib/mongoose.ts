import mongoose from "mongoose"

let connected = false

export const start = async() => {
    mongoose.set("strictQuery", true)

    if(!process.env.MONGO_URI) return console.log("MongoBD URI not found")
    if(connected) return console.log("Already connected to MongoDB")
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        connected = true
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
    }
}