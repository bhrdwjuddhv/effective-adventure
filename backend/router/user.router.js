import {Router} from "express";
import {
    forgetPassword,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser, updatePassword,
    updateUserDetails, updateUserImage, getCurrentUser
} from "../controller/user.controller.js";
import {verifyJWT} from "../middleware/middleware.js";
import {upload} from "../middleware/multer.middleware.js";


const router = Router();

router.route('/register').post(
    upload.fields([
    {
        name: "userImage",
        maxCount: 1,
    }
]),
    registerUser)
router.route('/login').post(loginUser)

// SECURE ROUTES
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/update-details').post(verifyJWT, updateUserDetails)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/forget-password').post(forgetPassword)
router.route('/update-password').post(updatePassword)
router.route('/update-user-image').post(
    verifyJWT,
    upload.single("userImage"),
    updateUserImage)

router.route('/get-current-user').get(
    verifyJWT,
    getCurrentUser
)




export default router;