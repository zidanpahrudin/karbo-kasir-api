const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const UserMenuSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId
    },
    menu_id: {
        type: ObjectId
    }
}, { collection: 'user_menu' });

module.exports = Config = mongoose.model("user_menu", UserMenuSchema);
