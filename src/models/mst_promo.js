const mongoose = require("mongoose");
const Float = mongoose.Schema.Decimal128;
const MstPromoSchema = new mongoose.Schema({
    promo_by: {
        type: String
    },
    promo_name: {
        type: String
    },
    disc_percent: {
        type: Float
    },
    disc_amount: {
        type: Float
    },
    active: {
        type: Number  
    }
}, { collection: 'mst_promo' });

module.exports = Config = mongoose.model("mst_promo", MstPromoSchema);
