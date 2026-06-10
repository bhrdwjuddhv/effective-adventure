import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
            schoolId: String,
            className: String,
            sectionName: String,
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            message: String
        }, {timestamps: true});

export const Message = mongoose.model("Message", messageSchema);