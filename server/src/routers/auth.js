import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const router = new express.Router();

// Register
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });
    user.save().then((user) => {
        const token = user.generateToken();
        res.status(201).send({
            success: true,
            token: token,
            username: user.username
        });
    }).catch((error) => {
        res.status(500).send({
            success: false,
            code: error.code
        });
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(404).send({
                success: false,
                error: "Invalid Credetials"
            });
        }
        bcrypt.compare(password, user.password).then((result) => {
            if (result) {
                const token = user.generateToken();
                res.status(201).send({
                    success: true,
                    token: token,
                    username: user.username
                });
            } else {
                res.status(404).send({
                    success: false,
                    error: "Invalid Credetials"
                });
            }
        })
    });
});

// Forgot password
router.post("/forgotpassword", (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(404).send({
                success: false,
                error: "Email could not be sent"
            });
        }

        const resetToken = user.getRestPasswordToken();
        // TODO Url is hardcoded
        const resetUrl = `http://localhost:3001/passwordreset/${resetToken}`;

        var message = `
            <p>Hello ${user.username}</p>
            <p>There was a request to change your password!</p>
            <p>You can reset your password by clicking the link below:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <br><br>
            <p>Yours,</p>
            <p>Advanced Authentication Team</p>
        `
        var options = {
            to: user.email,
            subject: "Your password reset link",
            text: message
        }
        sendEmail(options).then(() => {
            res.send({
                success: true
            });
        }).catch((error) => {
            res.status(400).send({
                success: false,
                error: "Some error occured"
            });
        });
    });
});

// Reset password
router.post("/resetpassword/:resetToken", (req, res) => {
    const { resetToken } = req.params;
    var resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    User.findOne({ resetPasswordToken }).then((user) => {
        if (!user) {
            return res.status(404).send({
                success: false,
                error: "Invalid or Expired Token"
            })
        }

        if (user.resetPasswordExpire > Date.now()) {
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            user.save().then((user) => {
                const token = user.generateToken();
                res.status(201).send({
                    success: true,
                    token: token,
                    username: user.username
                });
            }).catch((error) => {
                res.status(500).send({
                    success: false,
                    code: error.code
                });
            });
        } else {
            return res.status(404).send({
                success: false,
                error: "Invalid or Expired Token"
            })
        };
    });

});

export default router;