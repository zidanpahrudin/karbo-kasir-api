const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Float = mongoose.Schema.Decimal128;
const TrnOrderDetailSchema = new mongoose.Schema({
    salesd_id: {
        type: ObjectId
    },
    sales_id: {
        type: ObjectId
    },
    qty: {
        type: Number
    },
    capital: {
        type: Float
    },
    price: {
        type: Float
    },
    disc_percent: {
        type: Float
    },
    disc_value: {
        type: Float
    },
    subtotal: {
        type: Float
    },
    
}, { collection: 'trn_order_detail' });

module.exports = Config = mongoose.model("trn_order_detail", TrnOrderDetailSchema);
