const mongoose = require("mongoose");

const MstMenuSchema = new mongoose.Schema({
    app_code: {
        type: String  
    },
    menu_code: {
        type: String
    },
    menu_name: {
        type: String
    },
    menu_group: {
        type: String
    },
    active: {
        type: Number
    }
}, { collection: 'mst_menu' });

module.exports = Config = mongoose.model("mst_menu", MstMenuSchema);
