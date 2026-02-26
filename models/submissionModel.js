import db from '../config/db.js'

// Get All
export const getAll = async () => {
    try {
        const sql = "SELECT * FROM submissions";
        const [rows] = await db.query(sql);

        rows.forEach(row => {
            try {
                row.files = JSON.parse(row.files || [])
            } catch {
                row.files = []
            }
        })
        return rows;
    } catch (error) {
        throw error;
    }
}

// Get Specific Submission
export const getSubmissionById = async (id) => {
    try {
        const sql = "SELECT id, title, description, files, links FROM submissions WHERE id = ?";
        const [rows] = await db.query(sql, [id]);

        const submission = rows[0];

        if (submission) {
            submission.files = JSON.parse(submission.files || "[]");
        }

        return submission;
    } catch (error) {
        throw error;
    }
}

// Create Submission
export const createSubmission = async (submission) => {
    try {
        const sql = `
        INSERT INTO submissions (team_id, category_id, title, description, files, links) VALUES (?, ?, ?, ?, ?, ?)
        `;

        const newSubmission = [
            submission.team_id,
            submission.category_id,
            submission.title,
            submission.description,
            JSON.stringify(submission.files || []),
            submission.links
        ];

        const [result] = await db.query(sql, newSubmission);
        return result;
    } catch (error) {
        throw error;
    }
}