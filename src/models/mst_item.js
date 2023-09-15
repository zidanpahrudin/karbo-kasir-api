const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const MstItemsSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId  
    },
    pkg_id: {
        type: ObjectId
    },
    items_code: {
      type: String  
    },
    items_name: {
        type: String  
    },
    kind_id: {
        type: ObjectId  
    },
    category_id: {
        type: ObjectId  
    },
    group_id: {
        type: ObjectId  
    },
    is_package: {
      type: Number  
    },
    image_url: {
        type: String  
    },
    pic: {
        type: ObjectId  
    },
    remarks: {
        type: String  
    },
    active: {
        type: Number
    }
}, { collection: 'mst_items' });

module.exports = Config = mongoose.model("mst_items", MstItemsSchema);
