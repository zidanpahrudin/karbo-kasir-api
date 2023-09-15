const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const TrnStockSchema = new mongoose.Schema({
    item_id: {
        type: ObjectId  
    },
    stall_id: {
        type: ObjectId  
    },
    trn_date: {
      type: Date  
    },
    trn_month: {
      type: Number  
    },
    trn_year: {
      type: Number  
    },
    activity: {
      type: String  
    },
    item_in: {
      type: Number  
    },
    item_out: {
      type: Number  
    },
    adj_in: {
      type: Number  
    },
    adj_out: {
      type: Number  
    },
    old_stock: {
      type: Number  
    },
    current_stock: {
      type: Number  
    },
}, { collection: 'trn_stock' });

module.exports = Config = mongoose.model("trn_stock", TrnStockSchema);
