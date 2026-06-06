import mongoose from 'mongoose'
import {User} from "./user.models";

const teacherSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    qualification: {
        type: [{type: String}],
    },
    classes: {
        type: [{type: String}],
    },
    experience: {
        type: String,
    },
})

export const Teacher = User.discriminator(
    "Teacher",
    teacherSchema
);