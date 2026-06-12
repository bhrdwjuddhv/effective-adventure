import mongoose from "mongoose";
import {Message} from "../models/messages.models.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const loadMessages = asyncHandler(async (req, res) => {

   try{

       const messages =
           await Message.find({
               schoolId: req.user.schoolId,
               className: req.user.className,
               sectionName: req.user.sectionName
           }).sort({
               createdAt: 1
           });

       return res.status(200).json(
           new ApiResponse(200, messages, "fetched messages successfully")
       )

   }catch (e) {
       throw new ApiError(400, "Error fetching messages.", e);
   }





})

const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new ApiError(400, "Invalid message ID");
    }

    const canDeleteAnyMessage =
        ["admin", "teacher"].includes(req.user.role);

    const query = canDeleteAnyMessage
        ? { _id: messageId, schoolId: req.user.schoolId }
        : {
            _id: messageId,
            senderId: req.user._id,
            schoolId: req.user.schoolId
        };

    const deletedMessage =
        await Message.findOneAndDelete(query);

    if (!deletedMessage) {
        throw new ApiError(404, "Message not found or unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Message deleted successfully")
    );
});


export {loadMessages, deleteMessage}