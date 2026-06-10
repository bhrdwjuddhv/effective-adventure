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

export {loadMessages}