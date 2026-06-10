import {getSchoolVacation, getPublicHolidays, addSchoolVacation, deleteSchoolVacation, updateSchoolVacation} from "../controller/holiday.controller.js";
import {authorize, verifyJWT} from "../middleware/middleware.js";
import {Router} from "express";

const router = Router();

router.route('/fetch-public-holidays/:year')
    .get(getPublicHolidays);

router.route('/:schoolId/vacations')
    .get(getSchoolVacation)
    .post(
        verifyJWT,
        authorize("admin"),
        addSchoolVacation
    );

router.route('/:schoolId/vacations/:vacationId')
    .patch(
        verifyJWT,
        authorize("admin"),
        updateSchoolVacation
    )
    .delete(
        verifyJWT,
        authorize("admin"),
        deleteSchoolVacation
    );

export default router;