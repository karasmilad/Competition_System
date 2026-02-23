import bcrypt from "bcrypt";
import * as judgeModel from "../models/judgeModel.js";
//Get All
export const getAllJudges = async () => {
    try {
        const judges = await judgeModel.getAll();
        if (!judges.length) {
            throw new Error("No judges found");
        }
        return judges;
    }
    catch (error) {
        throw error;
    }
};
//Get Judge By Id
export const getJudgeById = async (id) => {
    try {
        if (!id) 
            throw new Error("Judge ID is required");
        const judge = await judgeModel.getJudgeById(id);
        if (!judge) 
            throw new Error("Judge not found");
        return judge;
    } catch (error) {
        throw error;
    }
};
//Create judge
export const createJudge = async (data) => {
    try {
        //validation
        if (!data.name || !data.email || !data.password) {
            throw new Error("Name, email and password are required");
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const result = await judgeModel.createJudge({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            photo: data.photo || null,
        });
        return result;
    } catch (error) {
        throw error;
    }
};