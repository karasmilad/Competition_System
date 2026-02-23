import * as judgeService from "../services/judgeService.js";
///Get All Judegs
export const getAllJudges = async (req, res) => {
    try {
        const judges = await judgeService.getAllJudges();
        res.status(200).json({
            success: true,
            data: judges
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};
////Get Judge By ID
export const getJudgeById = async (req, res) => {
    try {
        const judge = await judgeService.getJudgeById(req.params.id);
        res.status(200).json({
            success: true,
            data: judge
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
///Create Judge
export const create = async (req, res) => {
    try {
        const result = await judgeService.createJudge(req.body);
        res.status(201).json({
            success: true,
            message: "Judge created successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};