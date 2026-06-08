import {Router} from "express";
import {verifyJWT} from "../middleware/middleware";
import {updateTeacherDetails, getAllTeachers, getTeacher} from "../controller/teacher.controller";

const router = Router();

router.route('/school/:schoolId/teachers').get(getAllTeachers)
router.route('/update-teacher-details').post(verifyJWT, updateTeacherDetails)
router.route('/school/:schoolId/teachers/:rollNumber').get(getTeacher)

export default router;


