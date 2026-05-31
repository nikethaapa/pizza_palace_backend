const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/Userdata")

const router = express.Router()
// register
router.post("/register", async function (req, res) {
    try {
        console.log(req.body)
        const { name, email, password } = req.body
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })
        await newUser.save();
        res.status(201).json({
            message: "User Registered Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message
        });
    }
})

// login
const jwt = require("jsonwebtoken")
router.post("/login", async function (req, res) {
    try {
        const { email, password } = req.body;
        if (email === "admin@gmail.com" && password === "123") {

            const token = jwt.sign(
                {
                    id: "admin-id",
                    email: "admin@gmail.com",
                    role: "admin"
                },
                "secretkey123",
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                message: "Admin Login Successfully",
                token,
                role: "admin"
            });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const matchpass = await bcrypt.compare(password, user.password)
        if (!matchpass) {
            return res.status(400).json({
                message: "Invalid credential"
            })
        }
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                role: user.role
            },

            "secretkey123",

            {
                expiresIn: "24h"
            }

        );
        res.status(200).json({
            message: "Login Successfully",
            token,
            role: user.role || "user"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message
        })
    }
})

//profile
const authMiddleware = require("../middleware/authMiddleware")
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})
module.exports = router;