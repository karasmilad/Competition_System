import express from "express";
import * as judgeController from "../controllers/judgeController.js";
const router = express.Router();
//Get All Judges
router.get("/", judgeController.getAllJudges);
//Get Judge By Id
router.get("/:id", judgeController.getJudgeById);
//Create Judge
router.post("/", judgeController.create);
export default router