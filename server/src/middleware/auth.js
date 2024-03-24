import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const payload = jwt.verify(token, process.env.JWT_SIGN_KEY);

        User.findById(payload._id).then((user) => {
            if (!user) {
                return res.status(401).send({
                    sucess: false,
                    error: "Please Authenticate."
                });
            }
            req.user = user;
            next();
        }).catch(() => {
            return res.status(401).send({
                sucess: false,
                error: "Please Authenticate."
            });
        });
    } catch (error) {
        return res.status(401).send({
            sucess: false,
            error: "Please Authenticate."
        });
    }

};

export default auth;