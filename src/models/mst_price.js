const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Float = mongoose.Schema.Decimal128;
const MstPrice = new mongoose.Schema({
    item_id: {
        type: ObjectId
    },
    client_id: {
        type: ObjectId
    },
    price: {
        type: Float
    }
}, { collection: 'mst_price' });

module.exports = Config = mongoose.model("mst_price", MstPrice);
