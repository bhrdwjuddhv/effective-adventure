import School from "../models/school.models";
import {ApiError} from "../utils/ApiError";
import {ApiResponse} from "../utils/ApiResponse";
import {asyncHandler} from "../utils/asyncHandler";
import {User} from "../models";


const generateJoinCode = async (schoolName) => {
    const prefix = schoolName
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    let schoolId;
    let exists = true;

    while (exists) {
        const random = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();

        schoolId = `${prefix}-${random}`;

        exists = await School.exists({
            joinCode: schoolId
        });
    }

    return schoolId;
}

const registerSchool = asyncHandler(async (req, res) => {
    const {
        adminName,
        adminEmail,
        adminPassword,
        ...data} = req.body;
    if (Object.keys(data).length === 0) {
        throw new ApiError(
            400,
            "Data is required"
        );
    }
    try{
        const existingSchool = await School.findOne({
            registrationNumber: data.registrationNumber
        })
        if (existingSchool) {
            throw new ApiError(400,"School already exists");
        }

        const existingUser = await User.findOne({
            email: adminEmail
        })
        if (existingUser){
            throw new ApiError(400,"Admin email already in use");
        }

        const school = await School.create(
            {
                registrationNumber: data.registrationNumber,
                joinCode: await generateJoinCode(data.schoolName),
                schoolName: data.schoolName,
                contactEmail: data.contactEmail,
                contactNumber: data.contactNumber,
                schoolAddress: data.schoolAddress,
                board: data.board,
                schoolWebsite: data.schoolWebsite,
            }
        )

        const admin = await User.create({
            fullName: adminName,
            email: adminEmail,
            password: adminPassword,
            role: "admin",
            schoolId: data.registrationNumber,
            verified: true
        })

        school.adminId = admin._id;
        await school.save()
        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    school,
                    admin
                },
                "School created successfully"
            )
        );



    }catch(err){
        throw new ApiError(400,"Error creating School");
    }
})

const getSchoolInfo = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    try {
        const school = await School.findOne({
            registrationNumber: schoolId,
        })
        if (!school) {
            throw new ApiError(400,"School does not exist");
        }
        res.status(200).json(
            new ApiResponse(200, school, "School fetched successfully."),
        );
    }catch(e){
        throw new ApiError(400,"Error getting school info");
    }


})

const updateSchool = asyncHandler(async (req, res) => {

    try {

        const updates = req.body;

        const updatedSchool =
            await School.findOneAndUpdate(
                {
                    registrationNumber:
                    req.user.schoolId
                },
                {
                    $set: updates
                },
                {
                    new: true
                }
            );

        if (!updatedSchool) {
            throw new ApiError(
                404,
                "School not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedSchool,
                "School updated successfully"
            )
        );

    } catch (error) {

        throw new ApiError(
            500,
            error.message
        );

    }

})

const deleteSchool = asyncHandler(async (req, res) => {

    try {

        const school =
            await School.findOne({
                registrationNumber:
                req.user.schoolId
            });

        if (!school) {
            throw new ApiError(
                404,
                "School not found"
            );
        }

        await User.deleteMany({
            schoolId:
            req.user.schoolId
        });

        await School.deleteOne({
            registrationNumber:
            req.user.schoolId
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "School deleted successfully"
            )
        );

    } catch (error) {

        throw new ApiError(
            500,
            error.message
        );

    }

});




export {
    registerSchool,
    getSchoolInfo,
    updateSchool,
    deleteSchool
}



