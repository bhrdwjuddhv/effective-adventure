import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
    required: true,
    type: String,
    trim: true
    },
    email: {
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    },
    password: {
        required: [true, "Password is required"],
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
    },
    schoolId: {
        required: true,
        type: String,
    },
    rollNumber: {
        type: String,
    },
    holidays: {
        type: [{type: String}],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    userImage:{
        type: String,
    },
    className:{
        type: String,
    },
    sectionName:{
      type: String,
    },
    refreshToken: {
        type: String
    },
    passwordResetToken: {
        type: String,
    },
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            fullName: this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

export const User = mongoose.model("User", userSchema);
