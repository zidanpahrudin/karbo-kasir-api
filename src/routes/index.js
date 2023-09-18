const router = require("express").Router();

// user
router.use("/user", require("./api/user"));

// admin
router.use("/admin", require("./api/admin"));

// menu
router.use("/menu", require("./api/menu"));


module.exports = router;