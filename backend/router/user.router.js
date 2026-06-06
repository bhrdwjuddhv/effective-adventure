import {Router} from "express";
import {
    forgetPassword, getPendingUsers,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser, rejectUser, updatePassword,
    updateUserDetails, verifyUser
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



//PENDING USER HANDLERS
router.get(
    "/pending-users",
    verifyJWT,
    authorize("admin"),
    getPendingUsers
);

router.patch(
    "/verify-user/:userId",
    verifyJWT,
    authorize("admin"),
    verifyUser
);

router.delete(
    "/reject-user/:userId",
    verifyJWT,
    authorize("admin"),
    rejectUser
);

//HOLIDAY REQUEST HANDLERS




export default router;