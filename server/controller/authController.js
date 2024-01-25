import express from "express";
import authModel from "../model/authmodel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

class AuthController {
    static userRegistration = async (req, res) => {
        const { username, email, password } = req.body;

        try {
            if (username && email && password) {
                const isUser = await authModel.findOne({ email: email });

                if (!isUser) {
                    // hashing password
                    const genSalt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, genSalt);

                    // save a user
                    const newUser = new authModel({
                        username,
                        email,
                        password: hashedPassword, // save the hashed password
                    });

                    const savedUser = await newUser.save();

                    if (savedUser) {
                        return res.status(200).json({ message: "User registration successful" });
                    }
                } else {
                    return res.status(400).json({ message: "Email already exists" });
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    static userLogin = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (email && password) {
                const isUser = await authModel.findOne({ email: email });

                if (isUser) {
                    const isPasswordValid = await bcrypt.compare(password, isUser.password);

                    if (isPasswordValid) {
                        // generate token
                        const token = jwt.sign({ userID: isUser._id }, "Ahmad", {
                            expiresIn: "2d",
                        });

                        return res.status(200).json({
                            message: "Login successful",
                            token,
                            name: isUser.username,
                        });
                    } else {
                        res.status(400).json({ message: "Wrong Credentials" });
                    }
                } else {
                    res.status(400).json({ message: "Email ID Not Found" });
                }
            } else {
                res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default AuthController;
