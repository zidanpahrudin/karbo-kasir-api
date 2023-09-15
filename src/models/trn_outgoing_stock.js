const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const TrnOutgoingDetail = new mongoose.Schema({
    item_id: {
        type: ObjectId
    },
    stall_id: {
        type: ObjectId
    },
    os_no: {
        type: String
    },
    os_date: {
        type: Date
    },
    os_type: {
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
}, { collection: 'trn_outgoing_detail' });

module.exports = Config = mongoose.model("trn_outgoing_detail", TrnOutgoingDetail);
