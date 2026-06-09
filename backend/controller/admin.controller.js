import {User} from "../models";
import {ApiResponse} from "../utils/ApiResponse";
import {ApiError} from "../utils/ApiError";
import {asyncHandler} from "../utils/asyncHandler";

//PENDING USER HANDLERS
const getPendingUsers = asyncHandler(async (req, res) => {
    try{
        const users = await User.find({
            verified: false,
            schoolId: req.user.schoolId
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
                _id: userId,
            schoolId: req.user.schoolId
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

export {
    getPendingUsers,
    verifyUser,
    rejectUser,
}