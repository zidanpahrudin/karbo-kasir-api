const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
    cfg_type: {
        type: String
    },
    cfg_value: {
        type: String
    },
    active: {
        type: Number,
        default: 1
    }
}, { collection: 'config' });

module.exports = Config = mongoose.model("config", ConfigSchema);
