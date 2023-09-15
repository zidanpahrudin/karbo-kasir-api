const mongoose = require("mongoose");
const TrnPackageSchema = new mongoose.Schema({
    mp_code: {
      type: String  
    },
    mp_name: {
      type: String  
    },
    active: {
      type: Number 
    },
    
}, { collection: 'trn_package' });

module.exports = Config = mongoose.model("trn_package", TrnPackageSchema);
