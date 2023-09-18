const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const UserStallSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId
    },
    stall_id: {
        type: ObjectId
    }
}, { collection: 'user_stall' });

module.exports = UserStall = mongoose.model("user_stall", UserStallSchema);
