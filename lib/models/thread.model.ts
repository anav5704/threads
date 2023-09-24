import mongoose, { Schema } from "mongoose"

const threadSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community: { type: Schema.Types.ObjectId, ref: "Community" },
    text: { type: String, required: true, },
    parentI: { type: String },
    createdAt: { type: Date, default: Date.now },
    children: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
})

const Thread = mongoose.models?.Thread || mongoose.model("Thread", threadSchema)
export default Thread