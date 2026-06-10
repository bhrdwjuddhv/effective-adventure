import {Router} from "express";
import {verifyJWT, authorize} from "../middleware/middleware.js";
import {markAbsent, getAttendance, removeAbsence} from "../controller/attendance.controller.js";

const router = Router();


router.route("/mark-absent")
    .post(
        verifyJWT,
        authorize("admin", "teacher"),
        markAbsent
    );

router.route("/remove-absence")
    .delete(
        verifyJWT,
        authorize("admin", "teacher"),
        removeAbsence
    );

router.route("/:userId")
    .get(
        verifyJWT,
        getAttendance
    );


export default router;