import {Router} from "express";
import {verifyJWT, authorize} from "../middleware/middleware.js";
import {updateSchool, getSchoolInfo, registerSchool, deleteSchool} from "../controller/school.controller.js";

const router = Router();


router.route("/register-school")
    .post(registerSchool);

router.route("/update-school")
    .patch(
        verifyJWT,
        authorize("admin"),
        updateSchool
    );

router.route("/school-info/:schoolId")
    .get(getSchoolInfo);

router.route("/delete-school/:schoolId")
    .delete(
        verifyJWT,
        authorize("admin"),
        deleteSchool
    );

export default router;