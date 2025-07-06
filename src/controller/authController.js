import { generateToken } from "../lib/jwtService.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists " });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        }); 
        // console.log(newUser);
        if (newUser) {
            const { access_token, refresh_token } = generateToken(newUser.id, res);
            await newUser.save();

            return res.status(201).json({
                data: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                },
            });
        }
        else {
            return res.status(400).json({ message: "Invalid User data" });
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        console.log(isPasswordCorrect);

        const { access_token, refresh_token } = generateToken(user.id, res);

        res.status(201).json({
            data: {
                access_token: access_token,
                refresh_token: refresh_token,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}