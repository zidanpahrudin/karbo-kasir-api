const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Float = mongoose.Schema.Decimal128;
const TrnOrderSchema = new mongoose.Schema({
    sales_id: {
        type: ObjectId
    },
    item_id: {
        type: ObjectId
    },
    stall_id: {
        type: ObjectId
    },
    sales_no: {
        type: String
    },
    sales_date: {
        type: Date
    },
    ppn: {
        type: Float
    },
    service_charge: {
        type: Float
    },
    order_status: {
        type: String
    },
    grand_total: {
        type: Float
    },
    queue_no: {
        type: Number
    },
    table_no: {
        type: Number
    },
    is_cancel: {
        type: Number
    },
    pic: {
        type: ObjectId
    },
    remarks: {
        type: String
    },
}, { collection: 'trn_order' });

module.exports = Config = mongoose.model("trn_order", TrnOrderSchema);
