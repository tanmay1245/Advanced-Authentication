import express from "express";
import auth from "../middleware/auth.js";

const router = new express.Router();

router.get("/", auth, (req, res, next) => {
    res.send({
        success: true,
        data: req.user
    });
});

export default router;