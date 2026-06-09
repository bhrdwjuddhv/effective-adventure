import mongoose from 'mongoose';


const announcementSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    schoolId:{
        type: String,
        required: true,
    },
    content:{
        type: String,
    },
    audience: {
        type: String,
        enum: [
            "all",
            "teachers",
            "students",
            "class",
            "section"
        ],
        default: "all"
    },
    targetClass: {
        type: String
    },
    targetSection: {
        type: String
    },
    notice:[{
        type: String,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Announcement = mongoose.model('announcement',announcementSchema);