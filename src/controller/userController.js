import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({ data: users });

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (user) {
            return res.status(200).json({ data: user });
        }
        else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json({ data: user });

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "User deleted successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
