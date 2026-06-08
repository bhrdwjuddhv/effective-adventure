import {Router} from "express";
import {
    forgetPassword,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser, updatePassword,
    updateUserDetails
} from "../controller/user.controller";
import {verifyJWT, authorize} from "../middleware/middleware";


const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

// SECURE ROUTES
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/update-details').post(verifyJWT, updateUserDetails)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/forget-password').post(forgetPassword)
router.route('/update-password').post(updatePassword)




//HOLIDAY REQUEST HANDLERS




export default router;