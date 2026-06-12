import {User} from "../models/index.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

//PENDING USER HANDLERS
const getPendingUsers = asyncHandler(async (req, res) => {
    try{
        const users = await User.find({
            schoolId: req.user.schoolId,
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
        const user = await User.findOneAndUpdate(
            {
                schoolId: req.user.schoolId,
                _id: userId,

            },
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
        const user = await User.findOneAndDelete({
            _id: userId,
            schoolId: req.user.schoolId
        });

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

export {
    getPendingUsers,
    verifyUser,
    rejectUser,
}