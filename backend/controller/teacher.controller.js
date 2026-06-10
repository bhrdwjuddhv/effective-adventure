import {Teacher} from "../models/index.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const updateTeacherDetails = asyncHandler(async (req, res) => {
    const updates = req.body;
    try{
        const teacher = await Teacher.findOneAndUpdate(
            {
                _id: req.user._id,
                schoolId: req.user.schoolId
            },
            {
                $set: {
                    updates
                }
            },{new: true}).select('-password -refreshToken');
        if (!teacher) {
            throw new ApiError(404, 'Teacher not found');
        }

        res.status(200).json(
            new ApiResponse(200, teacher, "Teacher updated successfully."),
        )


    }catch(error){
        throw new ApiError(400,"Teacher not found",error);
    }
})

const getAllTeachers = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try{
        const teachers = await Teacher.find({ schoolId })
            .select("-password -refreshToken")
            .skip(skip)
            .limit(limit)

        return res.status(200).json(
            new ApiResponse(
                200,
                teachers,
                "Teachers fetched successfully"
            )
        );
    }catch (e) {
        throw new ApiError(400,"Error fetching teachers",e);
    }



})

const getTeacher = asyncHandler(async (req, res) => {
    const {schoolId, rollNumber} = req.params;
    try{
        if (!schoolId||!rollNumber) {
            throw new ApiError(400,"Data is required");
        }
        const teacher = await Teacher.findOne({schoolId, rollNumber})
        .select("-password -refreshToken")

        if (!teacher) {
            throw new ApiError(400,"Teacher not found");
        }

        return res.status(200).json(
            new ApiResponse(200,teacher,"Teacher data fetched successfully")
        )

    }catch(error){
        throw new ApiError(400,"Teacher fetch error",error);
    }


})

export {
    getAllTeachers,
    updateTeacherDetails,
    getTeacher,
}