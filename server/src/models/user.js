import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
        bcrypt.hash(user.password, 8).then((hashedPassword) => {
            user.password = hashedPassword;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SIGN_KEY);
    return token;
};

userSchema.methods.getRestPasswordToken = function () {
    const user = this;
    const resetToken = crypto.randomBytes(22).toString("hex");

    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    user.save();

    return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;