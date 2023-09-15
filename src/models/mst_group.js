const mongoose = require("mongoose");

const MstGroupSchema = new mongoose.Schema({
    group: {
      type: String  
    },
    active: {
        type: Number
    }
}, { collection: 'mst_group' });

module.exports = Config = mongoose.model("mst_group", MstGroupSchema);
