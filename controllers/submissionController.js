import * as submissionService from '../services/submissionService.js'

// Get All Submission
export const getAllSubmission = async (req, res) => {
    try {
        const submissions = await submissionService.getAllSubmission();

        res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get Specific Submission
export const getSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;

        const submission = await submissionService.getSubmissionById(id);

        res.status(200).json({
            success: true,
            data: submission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Create Submission
export const createSubmission = async (req, res) => {
    try {
        const submission = await submissionService.createSubmission(req.body);

        res.status(201).json({
            success: true,
            data: submission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}