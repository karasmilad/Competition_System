import * as submissionModel from '../models/submissionModel.js'

// Get All
export const getAllSubmission = async () => {
    try {
        const submissions = await submissionModel.getAll()

        if (submissions.length === 0) {
            throw new Error('No Submission Found')
        }

        return submissions
    } catch (error) {
        throw error;
    }
}

// Get Specific Submission
export const getSubmissionById = async (id) => {
    try {
        if (!id) {
            throw new Error("Submission ID not found")
        }

        const submission = await submissionModel.getSubmissionById(id)

        if (!submission) {
            throw new Error("Submission not found")
        }

        return submission
    } catch (error) {
        throw error;
    }
}

// Create Submission
export const createSubmission = async (data) => {
    try {
        if (!data.links || typeof data.links !== "string" || !data.links.startsWith("http")) {
            throw new Error("Invalid project link");
        }

        if (!data.title || !data.description || !Array.isArray(data.files)) {
            throw new Error("Missing required fields");
        }

        if (!data.team_id || !data.category_id) {
            throw new Error("Team and Category are required");
        }

        const result = await submissionModel.createSubmission({
            team_id: data.team_id,
            category_id: data.category_id,
            title: data.title.trim(),
            description: data.description.trim(),
            files: data.files,
            links: data.links.trim()
        })

        return result

    } catch (error) {
        throw error;
    }
}