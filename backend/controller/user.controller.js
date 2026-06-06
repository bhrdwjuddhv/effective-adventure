import {User, Teacher, Student} from "../models/";
import {ApiError} from "../utils/ApiError";
import {ApiResponse} from "../utils/ApiResponse";
import {asyncHandler} from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import forgotPasswordMail from "./passwordMail.controller";

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
    const roleModels = { Teacher, Student };
    const Model = roleModels[role];
    if (!Model) {
        throw new ApiError(400, "Invalid role");
    }
    const user = await Model.create(data)
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

    return res.status(200).clearCookie("accessToken", accessToken. options)
        .clearCookie("refreshToken", refreshToken, options)
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

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res.status(200).cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access Token refreshed successfully"))

    }catch(error){
        new ApiError(401, error?.message || "Invalid Refresh Token");
    }



})

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

//PENDING USER HANDLERS
const getPendingUsers = asyncHandler(async (req, res) => {
    try{
        const users = await User.find({
            verified: false
        }).select("-password -refreshToken");

        return res.status(200).json(
            new ApiResponse(
                200,
                users,
                "Pending users fetched"
            )
        );
    }catch(error){
        throw new ApiError(401, "Error in fetching pending ussers");
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                verified: true
            },
            {
                new: true
            }
        ).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User verified successfully"
            )
        );
    }catch (e) {
        throw new ApiError(401, "Error in verifyUser");
    }
});

const rejectUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

   try {
       const user = await User.findByIdAndDelete(
           userId
       );

       if (!user) {
           throw new ApiError(
               404,
               "User not found"
           );
       }

       return res.status(200).json(
           new ApiResponse(
               200,
               {},
               "User rejected successfully"
           )
       );
   }catch (e) {
       throw new ApiError(401, "Error in verifyUser");
   }
});









export {registerUser, loginUser , logoutUser,getPendingUsers , updateUserDetails ,
    refreshAccessToken ,forgetPassword, updatePassword, verifyUser, rejectUser};