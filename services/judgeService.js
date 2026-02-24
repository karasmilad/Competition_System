import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";
import * as judgeModel from "../models/judgeModel.js";
//Get All
export const getAllJudges = async (req) => {
    try {
        const judges = await judgeModel.getAll();
        if (!judges.length) throw new Error("No judges found");
        // map photo to full URL
        const judgesWithPhotoURL = judges.map(j => ({
            ...j,
            photo: j.photo ? `${req.protocol}://${req.get('host')}/uploads/judges/${j.photo}` : null
        }));
        return judgesWithPhotoURL;
    } catch (error) {
        throw error;
    }
}
// Get Judge By ID
export const getJudgeById = async (id, req) => {
    try {
        if (!id) throw new Error("Judge ID is required");
        const judge = await judgeModel.getJudgeById(id);
        if (!judge) throw new Error("Judge not found");
        // photo URL
        judge.photo = judge.photo ? `${req.protocol}://${req.get('host')}/uploads/judges/${judge.photo}` : null;
        return judge;
    } catch (error) {
        throw error;
    }
};
// Create Judge
export const createJudge = async (data) => {
    try {
        if (!data.name || !data.email || !data.password) {
            throw new Error("Name, email and password are required");
        }
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const result = await judgeModel.createJudge({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            photo: data.photo || null
        });
        return result;
    } catch (error) {
        throw error;
    }
};
// Update Judge
export const updateJudge = async (id, data) => {
    if (!id) throw new Error("Judge ID is required");
    const existingJudge = await judgeModel.getJudgeById(id);
    if (!existingJudge) throw new Error("Judge not found");
    let passwordToSave = existingJudge.password; // default
    if (data.password) {
        passwordToSave = await bcrypt.hash(data.password, 16);
    }
    if (data.photo && existingJudge.photo) {
        const oldPhotoPath = path.join("uploads/judges", existingJudge.photo);
        try {
            await fs.unlink(oldPhotoPath);
        } catch (err) {
            console.log("Old photo delete error:", err.message);
        }
    }
    const updatedJudge = {
        name: data.name ?? existingJudge.name ?? "",      // لو كله undefined خلي ""
        email: data.email ?? existingJudge.email ?? "",
        password: passwordToSave ?? existingJudge.password ?? "",
        photo: data.photo ?? existingJudge.photo ?? null  // لو كله undefined خلي null
    };
    const result = await judgeModel.updateJudge(id, updatedJudge);
    return result;
};
// Delete Judge
export const deleteJudge = async (id) => {
    try {
        if (!id) throw new Error("Judge ID is required");
        const existingJudge = await judgeModel.getJudgeById(id);
        if (!existingJudge) throw new Error("Judge not found");
        // delete photo if exists
        if (existingJudge.photo) {
            const photoPath = path.join("uploads/judges", existingJudge.photo);
            try {
                await fs.unlink(photoPath);
            } catch (err) {
                console.log("Photo delete error:", err.message);
            }
        }
        const result = await judgeModel.deleteJudge(id);
        return result;
    } catch (error) {
        throw error;
    }
};