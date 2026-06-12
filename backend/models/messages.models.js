import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
            schoolId: String,
            className: String,
            sectionName: String,
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            senderName: {
                type: String,
                required: true
            },
            message: String,
            edited: {
                type: Boolean,
                default: false
            }
        }, {timestamps: true});

export const Message = mongoose.model("Message", messageSchema);