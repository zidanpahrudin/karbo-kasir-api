// package
const router = require("express").Router();

// middleware
const auth = require("../../middleware/auth");

// controller
const menuController = require("../../controllers/menu.controller");


/**
 * api mendapatkan list menu active.
 *
 * @route   - menu/fetch
 * @method  - GET
 * @access private
 */

router.get('/fetch', auth, menuController.fetch);

/**
 * api mendapatkan menu by id.
 *
 * @route   - menu/fetch/:menu_id
 * @method  - GET
 * @access private
 */

router.get('/fetch/:menu_id', auth, menuController.fetch);

/**
 * api membuat menu.
 *
 * @route   - menu/create
 * @method  - POST
 * @access private
 */
router.post('/create', auth, menuController.create);


/**
 * api mengupdate menu.
 *
 * @route   - menu/update
 * @method  - POST
 * @access private
 */
router.post('/update/:menu_id', auth, menuController.update);

/**
 * api delete menu.
 *
 * @route   -/delete/menu
 * @method  - POST
 * @access private
 */

router.post('/delete/:menu_id', auth, menuController.remove);

module.exports = router;