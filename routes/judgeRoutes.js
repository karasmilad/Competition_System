import express from "express";
import * as judgeController from "../controllers/judgeController.js";
import { uploadJudgePhoto } from "../middleware/upload.js"
const router = express.Router();
// GET All
router.get("/", judgeController.getAllJudges);
// GET By ID
router.get("/:id", judgeController.getJudgeById);
// CREATE with photo
router.post("/", uploadJudgePhoto.single("photo"), judgeController.createJudge);
// UPDATE with photo
router.put("/:id", uploadJudgePhoto.single("photo"), judgeController.updateJudge);
// DELETE
router.delete("/:id", judgeController.deleteJudge);
export default router