import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, },
    bio: { type: String },
    image: { type: String },
    boarded: { type: Boolean, default: false },
    threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
    commuities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
})

const User = mongoose.models?.User || mongoose.model("User", userSchema)
export default User