import {Student} from "../models/index.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const getAllStudents = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await Student.find({ schoolId })
        .select("-password -refreshToken")
        .skip(skip)
        .limit(limit);

    return res.status(200).json(
        new ApiResponse(200, students, "Students fetched successfully")
    );
});

const getStudent = asyncHandler(async (req, res) => {
    const {schoolId, rollNumber} = req.params;

    if (!schoolId || !rollNumber) {
        throw new ApiError(400, "schoolId and rollNumber are required");
    }

    const student = await Student.findOne({ schoolId, rollNumber })
        .select("-password -refreshToken");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return res.status(200).json(
        new ApiResponse(200, student, "Student fetched successfully")
    );
});

const updateStudentDetails = asyncHandler(async (req, res) => {
    const updates = req.body;

    const student = await Student.findOneAndUpdate(
        {
            _id: req.user._id,
            schoolId: req.user.schoolId
        },
        { $set: updates },
        { new: true }
    ).select("-password -refreshToken");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return res.status(200).json(
        new ApiResponse(200, student, "Student updated successfully")
    );
});

export { getAllStudents, getStudent, updateStudentDetails };
