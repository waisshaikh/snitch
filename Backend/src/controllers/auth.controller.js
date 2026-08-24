import Usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    //  Changed from res.status({ ... }) to res.status(201).json({ ... })
    return res.status(201).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role,
        },
    });
}

export const regiterController = async (req, res) => {
    const { email, contact, password, fullname, isSeller } = req.body;
    try {
        const isUserExiste = await Usermodel.findOne({
            $or: [{ contact }, { email }],
        });

        if (isUserExiste) {
            return res
                .status(400)
                .json({ message: "User Already Exists With this Email or Contact" });
        }

        const user = await Usermodel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer",
        });

        await sendTokenResponse(user, res, "User registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
