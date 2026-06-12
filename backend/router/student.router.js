import {Router} from "express";
import {getAllStudents, getStudent, updateStudentDetails} from "../controller/student.controller.js";
import {verifyJWT, authorize} from "../middleware/middleware.js";

const router = Router();

router.route("/:schoolId").get(verifyJWT, authorize("admin", "teacher"), getAllStudents);
router.route("/:schoolId/:rollNumber").get(verifyJWT, getStudent);
router.route("/update-details").patch(verifyJWT, authorize("student"), updateStudentDetails);

export default router;
