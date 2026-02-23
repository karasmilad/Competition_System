import db from "../config/db.js";
//Get All
export const getAll = async () => {
    try {
        const [rows] = await db.query("SELECT id, name, email, photo FROM judge");
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};
//Get By ID
export const getJudgeById = async (id) => {
    try {
        const [rows] = await db.execute(
            "SELECT id, name, email, photo FROM judge++++++++ WHERE id = ?",
            [id]
        );
        return rows[0];
    } catch (error) {
        throw new Error(`DB Error: ${error.message}`);
    }
};
//Create Judge
export const createJudge = async (judge) => {
    try {
        const sql = `
                        INSERT INTO judge (name, email, password, photo)
                        VALUES (?, ?, ?, ?)
                        `;
        const [result] = await db.execute(sql, [
            judge.name,
            judge.email,
            judge.password,
            judge.photo || null,
        ]);
        return result;
    } catch (error) {
        throw new Error("Database Error: " + error.message);
    }
};