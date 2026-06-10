import {User, Teacher, Student} from "../models/index.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import forgotPasswordMail from "../services/email/forgotPasswordMail.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        })
        return {accessToken, refreshToken}
    }catch(error){
        throw new ApiError(500,"token generation error");
    }

}

const generatePasswordResetToken = async (userId,email) => {
    return jwt.sign({
        _id: userId,
        email: email
    },
        process.env.PASSWORD_TOKEN_SECRET,
        {expiresIn: process.env.PASSWORD_TOKEN_EXPIRY}
        )
}

// USER HANDLERS
const registerUser = asyncHandler(async (req, res) => {
    const { role, ...data } = req.body;
    if ([...Object.values(data), role].some((field) => field?.trim() === "")){
        throw new ApiError(
            400 ,"All fields are required"
        )
    }
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const userImageLocalPath = req.files?.userImage[0]?.path;
    let userImage;

    if (userImageLocalPath) {
        const uploadedImage =
            await uploadOnCloudinary(
                userImageLocalPath
            );

        if(!uploadedImage){
            console.log("Image upload failed");
        }

        userImage =
            uploadedImage?.url;
    }


    const roleModels = { Teacher, Student };
    const Model = roleModels[role];
    if (!Model) {
        throw new ApiError(400, "Invalid role");
    }
    const user = await Model.create({
        ...data,
        userImage
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Credentials cannot be empty");
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        throw new ApiError(400, "User does not exist");
    }
    const isPasswordCorrect = await existingUser.comparePassword(password)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Credentials");
    }

    if (!existingUser.verified) {
        throw new ApiError(
            403,
            "Account pending verification"
        );
    }

      const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(existingUser._id);
    const loggedInUser =await User.findById(existingUser._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken,

            }, "User logged in successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))


})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { email, fullName } = req.body;
    if (!fullName || !email) {
        throw new ApiError(401, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName: fullName,
                email: email,
                role: role,
                schoolId: schoolId,
            }
        }, { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try{
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user  = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Expired refresh token");
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res.status(200).cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {accessToken, refreshToken}, "Access Token refreshed successfully"))

    }catch(error){
        new ApiError(401, error?.message || "Invalid Refresh Token");
    }



})

const updateUserImage = asyncHandler(async (req, res) => {
    const userImageLocalPath = req.file?.path
    if(!userImageLocalPath) {
        new ApiError(401, "Invalid avatar local path")
    }
    const userImage = await uploadOnCloudinary(userImageLocalPath)
    if(!userImage.url){
        throw new ApiError(401, "Error uploading avatar")
    }

    const user =  await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                userImage: userImage.url
            }
        } , {new: true}
    ).select("-password")

    return res.status(200).json(new ApiResponse(200,user,"User Image updated successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(200 , req.user, "Current User Fetched Successfully")
})

// PASSWORD HANDLING
const forgetPassword = asyncHandler(async (req, res) => {
    const email = req.body.email
    if (!email) {
        throw new ApiError(401, "Enter email address");
    }
    const user = await User.findOne({email} )
    if (!user) {
        throw new ApiError(401, "User does not exist");
    }
    const passwordResetToken = await generatePasswordResetToken(user?._id, user?.email);

    const mail = await forgotPasswordMail(email,passwordResetToken)
    if (!mail) {
        throw new ApiError(401, "Email Dispatch Error");
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset email sent"
        )
    );
})

const updatePassword = asyncHandler(async (req, res) => {
    const { passwordResetToken, newPassword} = req.body;
    if (!newPassword || !passwordResetToken) {
        throw new ApiError(401, "All fields are required");
    }

    let decoded;

    try {
        decoded = jwt.verify(
            passwordResetToken,
            process.env.PASSWORD_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(
            401,
            "Invalid or expired password reset token"
        );
    }

    const user = await User.findById(decoded?._id)
    if (!user) {
        throw new ApiError(401, "Invalid Password Reset Token");
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    await user.save()

    const updatedUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200,updatedUser , "User Password updated successfully"))
})











export {registerUser, loginUser , logoutUser, updateUserDetails ,
    refreshAccessToken ,forgetPassword, updatePassword};