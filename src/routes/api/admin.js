// package
const router = require("express").Router();

// middleware
const auth = require("../../middleware/auth");

// controller
const {
    fetch,
    create,
    update,
    remove
} = require("../../controllers/stall.controller");


/**
 * api admin mendapatkan list cabang active.
 *
 * @route   - admin/fetch/stall
 * @method  - POST
 * @access private
 */

router.get('/fetch/stall', auth, fetch);

/**
 * api admin mendapatkan cabang by id.
 *
 * @route   - admin/get/stall/:stall_id
 * @method  - POST
 * @access private
 */

router.get('/fetch/stall/:stall_id', auth, fetch);


/**
 * api admin membuat cabang.
 *
 * @route   - admin/create/stall
 * @method  - POST
 * @access private
 */

router.post('/create/stall', auth, create);

/**
 * api admin mengupdate cabang.
 *
 * @route   - admin/update/stall
 * @method  - POST
 * @access private
 */

router.put('/update/stall/:stall_id', auth, update);

/**
 * api admin delete cabang.
 *
 * @route   - admin/delete/stall
 * @method  - POST
 * @access private
 */

router.put('/delete/stall/:stall_id', auth, remove);

/**
 * api admin register user.
 *
 * @route   - admin/create/user
 * @method  - POST
 * @access private
 */
router.post("/create/user");


module.exports = router;