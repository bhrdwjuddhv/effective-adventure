import mongoose from 'mongoose'
import {User} from "./user.models.js";

const teacherSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    qualification: {
        type: [{type: String}],
    },
    assignedSections:[
        {
            className:String,
            sectionName:String
        }
    ],
    experience: {
        type: String,
    },
})

export const Teacher = User.discriminator(
    "Teacher",
    teacherSchema
);