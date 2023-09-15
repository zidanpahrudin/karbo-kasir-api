const mongoose = require("mongoose");

const MstCategorySchema = new mongoose.Schema({
    category: {
        type: String  
    },
    active: {
        type: Number
    }
}, { collection: 'mst_category' });

module.exports = Config = mongoose.model("mst_category", MstCategorySchema);
