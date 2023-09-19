// package
const router = require("express").Router();

// middleware
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");

// controller
const itemController = require("../../controllers/item.controller");

/**
 * api mendapatkan list item active.
 *
 * @route   -/fetch/item
 * @method  - POST
 * @access private
 */

router.get('/fetch', auth, itemController.fetch);

/**
 * api mendapatkan item by id.
 *
 * @route   -/get/item/:item_id
 * @method  - POST
 * @access private
 */

router.get('/fetch/:item_id', auth, itemController.fetch);


/**
 * api membuat item.
 *
 * @route   -/create/item
 * @method  - POST
 * @access private
 */

router.post('/create', auth, upload.send, itemController.create);

/**
 * api mengupdate item.
 *
 * @route   -/update/item
 * @method  - POST
 * @access private
 */

router.post('/update/:item_id', auth, itemController.update);

/**
 * api delete item.
 *
 * @route   -/delete/item
 * @method  - POST
 * @access private
 */

router.post('/delete/:item_id', auth, itemController.remove);

module.exports = router;