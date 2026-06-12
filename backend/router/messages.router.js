import {authorize, verifyJWT} from "../middleware/middleware.js";
import {Router} from "express";
import {deleteMessage, loadMessages} from "../controller/message.controller.js";

const router = Router();

router.route("/get-all-messages").get(
    verifyJWT,
    loadMessages,
)

router.route("/message/:messageId").delete(
    verifyJWT,
    deleteMessage
);

export default router;
