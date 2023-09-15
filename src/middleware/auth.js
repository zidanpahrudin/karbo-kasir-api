const jwt = require("jsonwebtoken");
const config = require("config");
const MstUser = require("../models/mst_user");

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
        return res
            .status(401)
            .json({ status: "failed", message: "No token, authorization denied..", data: [] });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get("JWT_SECRET"));
        req.user = decoded;

        // cek user exist
        const user = await MstUser.findOne({
            _id: req.user.id
        }).lean();
        if (!user) {
            return res.json({ 
                status: "failed", 
                message: "User tidak di temukan", 
                data: [] 
            });
        }

        next();
    } catch (err) {
        // console.log(err)
        res.json({ 
            status: "failed", 
            message: "Token is not valid", 
            data: [] 
        });
    }
};
