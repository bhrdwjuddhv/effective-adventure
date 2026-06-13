import mongoose from "mongoose";
import {User} from "./user.models.js";

const studentSchema = new mongoose.Schema({
    result: [
        {
            class: String,
            percentage: String,
            result: Boolean,
        }
    ],
    dob: {
        type: String,
        required: true,
    }

})

export const Student = User.discriminator(
    "student",
    studentSchema,
);