import {User, School} from "../models/index.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const markAbsent = asyncHandler(async (req, res) => {
        const {userId, date} = req.body;

        if (!userId || !date) {
            throw new ApiError(400, "User ID and date is required");
        }
        try{
            const updatedUser =
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $addToSet: {
                            holidays: date
                        }
                    },
                    {
                        new: true
                    }
                ).select("-password -refreshToken")

            if(!updatedUser) {
                throw new ApiError(404, "User not found");
            }
            return res.status(200).json(
                new ApiResponse(
                    200,
                    updatedUser,
                    "Student marked absent"
                )
            );
        } catch(err){
            throw new ApiError(500,"error adding holiday" ,err);
        }
    })

const removeAbsence = asyncHandler(async (req, res) => {
    const {userId, date} = req.body;
    if (!userId || !date) {
        throw new ApiError(400, "User ID and date is required");
    }
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                holidays: date
            }
        },
        {new: true}
    ).select("-password -refreshToken")

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, updatedUser, "successfully removed date from holiday"));

})

const getAttendance = asyncHandler(async (req, res) => {
    const {userId} = req.params;
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    try{
        const userHolidays = await User.findById(userId).select("holidays")
        if (!userHolidays) {
            throw new ApiError(404, "User does not exist");
        }
        return res.status(200).json(new ApiResponse(200, userHolidays, "fetched user holidays"));


    }catch(err){
        throw new ApiError(500,"error fetching holidays" ,err);
    }



})

export {
    markAbsent,
    removeAbsence,
    getAttendance,
}


