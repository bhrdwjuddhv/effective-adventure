import {Router} from "express";
import {verifyJWT, authorize} from "../middleware/middleware";
import {updateSchool, getSchoolInfo, registerSchool, deleteSchool} from "../controller/school.controller";

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