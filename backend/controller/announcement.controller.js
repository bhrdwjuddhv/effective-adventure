import {Announcement} from "../models/announcement.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const createAnnouncement = asyncHandler(async (req, res) => {
    const {
        title,
        content,
        audience,
        targetClass,
        targetSection,
        notice,
        createdBy
    } = req.body

    if(!user){
        throw new ApiError(403, "User Not Found!");
    }
    if ([title,content,audience].some((field)=>field?.trim() === "")){
        throw new ApiError(403, "Data Required!");
    }
    try{
        const noticeLocalPath = req.files?.notice[0]?.path;
        let notice;
        if (noticeLocalPath){
         const  uploadedNotice = await uploadOnCloudinary(noticeLocalPath);
         if(!uploadedNotice){
             throw new ApiError(403, "Error uploading notice!");
         }

            notice = uploadedNotice?.url;
        }



        const announcement = await Announcement.create({
            title,
            schoolId: user?.schoolId,
            audience,
            content,
            targetClass,
            targetSection,
            notice,
            createdBy: req.user._id,

        })
        if(!announcement){
            throw new ApiError(403, "Error uploading announcement!");
        }
        return res.status(200).json(
            new ApiResponse(200, announcement, "Announcement Created!")
        );




    }catch(err){
        throw new ApiError(403, "Error creating announcement!", err);
    }




})

const updateAnnouncement = asyncHandler(async (req, res) => {
    const updates = req.body

    const {announcementId} = req.params;

    try{

        const updatedAnnouncement =
            await Announcement.findOneAndUpdate(
                {
                    _id: announcementId,
                    schoolId: req.user.schoolId
                },
                {
                    $set: updates
                },
                {
                    new: true
                }
            );

        if (!updatedAnnouncement) {
            throw new ApiError(
                404,
                "Announcement not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(200, updatedAnnouncement, "Announcement Updated!")
        )
    }catch (e) {
        throw new ApiError(403, "Error updating announcement!", e);
    }

})

const deleteAnnouncement = asyncHandler(async (req, res) => {

        const { announcementId } = req.params;

        const deletedAnnouncement = await Announcement.findOneAndDelete({
                _id: announcementId,
                schoolId: req.user.schoolId
            });

        if (!deletedAnnouncement) {
            throw new ApiError(
                404,
                "Announcement not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Announcement deleted successfully"
            )
        );

    });

const getAllAnnouncements = asyncHandler(async (req, res) => {

    const page =
        Number(req.query.page) || 1;

    const limit =
        Number(req.query.limit) || 10;

    const skip =
        (page - 1) * limit;

    const announcements =
        await Announcement.find({
            schoolId: req.user.schoolId
        }).sort({
            createdAt: -1
        })
            .skip(skip)
            .limit(limit);

    return res.status(200).json(
        new ApiResponse(200, announcements, "Announcements fetched successfully")
    );



})

const getAnnouncement = asyncHandler(async (req, res) => {
    const {announcementId} = req.params;

    try{
        const announcement = await Announcement.findOne({
                schoolId: req.user.schoolId,
                _id: announcementId,
            })

        if(!announcement){
            throw new ApiError(404, "Announcement not found!");
        }

        return res.status(200).json(
            new ApiResponse(200, announcement, "Announcement fetched!")
        )

    }catch(err){
        throw new ApiError(403, "Error getting announcement!", err);
    }



})

export {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAllAnnouncements,
    getAnnouncement
}