const router = require("express").Router();

// user
router.use("/user", require("./api/user"));

// admin
router.use("/admin", require("./api/admin"));


module.exports = router;