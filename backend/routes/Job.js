import express from "express";
import { applyJobByJobId, cancelApplication } from "../controllers/Job.js";
import { protect } from "../middleWare/authMiddlewre.js";

const router = express.Router();

router.get("/apply", protect, applyJobByJobId);
router.get("/cancel", protect, cancelApplication);

export default router;
