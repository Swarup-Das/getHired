import express from "express";
import {
  deleteAjob,
  getAllJobs,
  getPostByPostId,
  getPostsByUserId,
  postAJob,
  searchJobsByCompany,
  searchJobsBySkill,
  updateAjob,
} from "../controllers/Post.js";
import { protect } from "../middleWare/authMiddlewre.js";

const router = express.Router();

router.post("/create", protect, postAJob);
router.get("/allPosts", getAllJobs);
router.post("/searchSkill", searchJobsBySkill);
router.get("/:company", searchJobsByCompany);
router.delete("/delete/:id", protect, deleteAjob);
router.post("/update/:id", protect, updateAjob);
router.get("/byUserId/:userId", getPostsByUserId);
router.get("/byPostId/:postId", getPostByPostId);
// router.post("/update");
// router.get("/delete");

export default router;
