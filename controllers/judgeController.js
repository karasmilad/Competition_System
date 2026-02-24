import * as judgeService from "../services/judgeService.js";
///Get All Judegs
export const getAllJudges = async (req, res) => {
    try {
        const judges = await judgeService.getAllJudges(req);
        res.status(200).json({ success: true, data: judges });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// Get Judge By ID
export const getJudgeById = async (req, res) => {
    try {
        const { id } = req.params;
        const judge = await judgeService.getJudgeById(id, req);
        res.status(200).json({ success: true, data: judge });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// Create Judge
export const createJudge = async (req, res) => {
    try {
        const data = {
            ...req.body,
            photo: req.file ? req.file.filename : null
        };
        const result = await judgeService.createJudge(data);
        res.status(201).json({ success: true, message: "Judge created successfully", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// Update Judge
export const updateJudge = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            ...req.body,
            photo: req.file ? req.file.filename : undefined
        };
        const result = await judgeService.updateJudge(id, data);
        res.status(200).json({ success: true, message: "Judge updated successfully", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// Delete Judge
export const deleteJudge = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await judgeService.deleteJudge(id);
        res.status(200).json({ success: true, message: "Judge deleted successfully", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};