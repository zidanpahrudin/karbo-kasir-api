// package
const router = require("express").Router();

// middleware
const auth = require("../../middleware/auth");

// controller
const stallController = require("../../controllers/stall.controller");
const userController = require("../../controllers/user.controller");
const clientController = require("../../controllers/client.controller");



/**
 * api admin mendapatkan list cabang active.
 *
 * @route   - admin/fetch/stall
 * @method  - POST
 * @access private
 */

router.get('/fetch/stall', auth, stallController.fetch);

/**
 * api admin mendapatkan cabang by id.
 *
 * @route   - admin/get/stall/:stall_id
 * @method  - POST
 * @access private
 */

router.get('/fetch/stall/:stall_id', auth, stallController.fetch);


/**
 * api admin membuat cabang.
 *
 * @route   - admin/create/stall
 * @method  - POST
 * @access private
 */

router.post('/create/stall', auth, stallController.create);

/**
 * api admin mengupdate cabang.
 *
 * @route   - admin/update/stall
 * @method  - POST
 * @access private
 */

router.put('/update/stall/:stall_id', auth, stallController.update);

/**
 * api admin delete cabang.
 *
 * @route   - admin/delete/stall
 * @method  - POST
 * @access private
 */

router.put('/delete/stall/:stall_id', auth, stallController.remove);

/**
 * api admin register user.
 *
 * @route   - admin/create/user
 * @method  - POST
 * @access private
 */
router.post("/create/user", auth, userController.create);


/**
 * api admin mendapatkan list client.
 *
 * @route   - admin/fetch/clients
 * @method  - GET
 * @access private
 */
router.get("/fetch/clients", auth, clientController.fetch);

/**
 * api admin mendapatkan client by id.
 *
 * @route   - admin/fetch/clients/:client_id
 * @method  - GET
 * @access private
 */
router.get("/fetch/client/:client_id", auth, clientController.fetch);


module.exports = router;