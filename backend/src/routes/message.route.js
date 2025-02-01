import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, senedMessage } from "../controllers/message.controller.js";

const router=express.Router();

router.get('/users',protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,senedMessage)
export default router;