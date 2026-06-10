import {getPendingUsers, verifyUser, rejectUser} from "../controller/admin.controller.js";
import {Router} from "express";
import {verifyJWT, authorize} from "../middleware/middleware.js";

const router = Router();


//PENDING USER HANDLERS
router.route('/pending-users')
    .get(verifyJWT, authorize("admin"), getPendingUsers);

router.route('/verify-user/:userId')
    .patch(verifyJWT, authorize("admin"), verifyUser);

router.route('/reject-user/:userId')
    .delete(verifyJWT, authorize("admin"), rejectUser);

export default router;





