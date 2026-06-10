import {authorize, verifyJWT} from "../middleware/middleware.js";
import {Router} from "express";
import {loadMessages} from "../controller/message.controller.js";

const router = Router();

router.route("/messages").get(
    verifyJWT,
    loadMessages,
)
