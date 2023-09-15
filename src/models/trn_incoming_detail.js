const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Float = mongoose.Schema.Decimal128;
const TrnIncomingDetailSchema = new mongoose.Schema({
    is_id: {
        type: ObjectId
    },
    qty: {
        type: Number
    },
    item_price: {
        type: Float
    },
    shipping_cost: {
        type: Float
    },
    tax: {
        type: Float
    },
    other_cost: {
        type: Float
    },
    subtotal: {
        type: Float
    }
}, { collection: 'trn_incoming_detail' });

module.exports = Config = mongoose.model("trn_incoming_detail", TrnIncomingDetailSchema);
