import {Router} from "express";
import {authorize, verifyJWT} from "../middleware/middleware";
import {createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement, getAnnouncement} from "../controller/announcement.controller";
import {upload} from "../middleware/multer.middleware";

const router = Router();

router.route("/")
    .get(
        verifyJWT,
        getAllAnnouncements
    )
    .post(
        verifyJWT,
        authorize("admin", "teacher"),
        upload.fields([
            {
                name: "notice",
                maxCount: 1
            }
        ]),
        createAnnouncement
    );

router.route("/:announcementId")
    .get(
        verifyJWT,
        getAnnouncement
    )
    .patch(
        verifyJWT,
        authorize("admin", "teacher"),
        updateAnnouncement
    )
    .delete(
        verifyJWT,
        authorize("admin"),
        deleteAnnouncement
    );

export default router;