import {Router} from "express";
import {verifyJWT, authorize} from "../middleware/middleware";
import {markAbsent, getAttendance, removeAbsence} from "../controller/attendance.controller";

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