const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const TrnIncomingSchema = new mongoose.Schema({
    item_id: {
        type: ObjectId
    },
    stall_id: {
        type: ObjectId
    },
    is_no: {
        type: String
    },
    is_date: {
        type: Date
    },
    ref_no: {
        type: String
    },
    is_type: {
        type: String
    },
    is_cancel: {
        type: Number
    },
    pic: {
        type: ObjectId
    },
    remarks: {
        type: String
    }
}, { collection: 'trn_incoming' });

module.exports = Config = mongoose.model("trn_incoming", TrnIncomingSchema);
