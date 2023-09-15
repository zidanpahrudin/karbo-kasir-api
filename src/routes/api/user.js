// package
const router = require("express").Router();

// middleware

const validates = require("../../middleware/validates")

const {
    clientObject
} = require("../../middleware/validates/schema/user.schema");


// controllers
const {
    create
} = require("../../controllers/client.controller");

const {
    login
} = require("../../controllers/user.controller");

const {
    approval
} = require("../../controllers/admin.controller");

/**
 * api mendapatkan client.
 *
 * @route   - user/list/client
 * @method  - GET
 * @access private
 */

router.get("/list/client");

/**
 * api registrasi client.
 *
 * @route   - user/registrasi/client
 * @method  - POST
 * @access public
 */
router.post("/registrasi/client", validates(clientObject), create);


/**
 * api update client.
 *
 * @route   - user/update/client
 * @method  - PUT
 * @access private
 */
router.put("/update/client"),

/**
 * api super admin approve client dan
 * buat database transaksi untuk client tersebut.
 *
 * @route   - user/approve/client
 * @method  - POST
 * @access private
 */
router.post("/approve/client", approval);

/**
 * api login client.
 *
 * @route   - user/login/admin
 * @method  - POST
 * @access public
 */
router.post("/login/admin", login);





module.exports = router;