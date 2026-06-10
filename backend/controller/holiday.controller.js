import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {School} from "../models/index.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getPublicHolidays = asyncHandler(async (req, res) => {
    const {year} = req.query;
    // const nationalHolidays = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`)
    //https://api-ninjas.com/api/holidays#holidays-endpoint

})

const getSchoolVacation = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    if (!schoolId) {
        return res.status(400).send("School is required");
    }
    try{
        const schoolVacation = await School.findOne(
            {registrationNumber: schoolId}
    ).select("vacations")

        if (!schoolVacation) {
            throw new ApiError(404, "School not found");
        }

        return res.status(200).json(
            new ApiResponse(200, schoolVacation, "Vacation fetched successfully")
        )

    }catch(err){
        throw new ApiError(400, "Error fetching school vacation",err);
    }



})

const addSchoolVacation = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    const {
        title,
        startDate,
        endDate
    } = req.body;

    if (!schoolId) {
        throw new ApiError(404, "School ID is required");
    }
    if (!title || !startDate || !endDate) {
        return res.status(400).send("Vacation Data is required");
    }

    try{
        const school = await School.findOne(
            {
                registrationNumber: schoolId,
            }
        )

        if (!school) {
            throw new ApiError(404, "School not found");
        }

        if (new Date(startDate) > new Date(endDate)) {
            throw new ApiError(
                400,
                "Start date cannot be after end date"
            );
        }

        school.vacations.push({
            title,
            startDate,
            endDate
        });

        await school.save();



   return res.status(200).json(
        new ApiResponse(200, school, "Vacation added successfully")
    )

    }catch(err){
        throw new ApiError(400, "Error adding school vacation",err);
    }

})

const deleteSchoolVacation = asyncHandler(async (req, res) => {
    const {schoolId, vacationId} = req.params;

    if(!schoolId) {
        throw new ApiError(400, "School ID is required");
    }
    if(!vacationId) {
        throw new ApiError(400, "vacationId is required");
    }

    try{
        const school = await School.findOne(
            {
                registrationNumber: schoolId,
            }
        )

        if (!school) {
            throw new ApiError(404, "School not found");
        }

        school.vacations = school.vacations.filter(
            vacation => vacation.vacationId !== vacationId
        )

        await school.save();

        return res.status(200).json(
            new ApiResponse(200, school, "Vacation deleted successfully")
        )

    }catch(err){
        throw new ApiError(400, "Error removing school vacation",err);
    }




})

const updateSchoolVacation = asyncHandler(async (req, res) => {
    const {schoolId} = req.params;
    const {
        vacationId,
        title,
        startDate,
        endDate
    } = req.body;
    if(!schoolId) {
        throw new ApiError(400, "School ID is required");
    }
    if(!vacationId) {
        throw new ApiError(400, "vacationId is required");
    }

try
    {
        const school =
            await School.findOne({
                registrationNumber: schoolId
            });

        if (!school) {
            throw new ApiError(
                404,
                "School not found"
            );
        }

        const vacation =
            school.vacations.find(
                vacation =>
                    vacation.vacationId ===
                    vacationId
            );

        if (!vacation) {
            throw new ApiError(
                404,
                "Vacation not found"
            );
        }

        if (title)
            vacation.title = title;

        if (startDate)
            vacation.startDate = startDate;

        if (endDate)
            vacation.endDate = endDate;

        await school.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                school,
                "Vacation updated successfully"
            )
        );

    }
catch(err){
    throw new ApiError(400, "Error updating vacation data");
}


})

export {
    getSchoolVacation,
    getPublicHolidays,
    addSchoolVacation,
    deleteSchoolVacation,
    updateSchoolVacation,
}