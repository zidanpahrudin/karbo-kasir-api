const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
//const Float = mongoose.Schema.Decimal128;
const TrnPackageDetailSchema = new mongoose.Schema({
    pkg_id: {
      type: ObjectId 
    },
    item_id: {
        type: ObjectId  
    },
    price: {
//      type: Float 
    },
}, { collection: 'trn_package_detail' });

module.exports = Config = mongoose.model("trn_package_detail", TrnPackageDetailSchema);
