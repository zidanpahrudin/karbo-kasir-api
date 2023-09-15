const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const TrnOutgoingDetail = new mongoose.Schema({
    out_id: {
        type: ObjectId
    },
    qty: {
        type: Number
    },
    unit_name: {
        type: String
    }

}, { collection: 'trn_outgoing_detail' });

module.exports = Config = mongoose.model("trn_outgoing_detail", TrnOutgoingDetail);
