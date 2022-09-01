import express from "express";
import { getUserDetailsById, updateUserProfile } from "../controllers/User.js";
import { protect } from "../middleWare/authMiddlewre.js";
import router from "./Post.js";

const route = express.Router();

router.get("/userDetails/byId", getUserDetailsById);
router.post("/update/byId", protect, updateUserProfile);

export default router;
