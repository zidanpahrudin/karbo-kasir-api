const mongoose = require("mongoose");
const momentTimezone = require('moment-timezone')
momentTimezone.tz("Asia/Jakarta");
const localDate = require("../utils/localDate");
const MstMenuSchema = new mongoose.Schema({
    app_code: {
        type: String  
    },
    menu_code: {
        type: String
    },
    menu_name: {
        type: String
    },
    menu_group: {
        type: String
    },
    input_time: {
        type: Date,
        default: localDate,
    },
    count: {
        type: Number
    },
    active: {
        type: Number,
        default: 1
    }
}, { collection: 'mst_menu' });

MstMenuSchema.pre("save", async function(next) {
    const menu = this;
    const inputTime = momentTimezone(menu.input_time).format("YYYYMM");
    const inputMonth = momentTimezone(menu.input_time).month();
    const inputYear = momentTimezone(menu.input_time).year();
    let count = 1;
    let code = "MNU"
    menu.count = count;
    
    const previousDocument = await menu.constructor.findOne({
        input_time: { $lt: menu.input_time },
    }).sort({ input_time: -1 });
    
    if(previousDocument) {
        const previousMonth = momentTimezone(previousDocument.input_time).month();
        const previousYear = momentTimezone(previousDocument.input_time).year();
        if(inputMonth > previousMonth || inputYear > previousYear) {
            count = 1;
            menu.count = count;
        } else {
            count = previousDocument.count + 1;
            menu.count = count;
        }
    }
    
    let nomor = "0000";
    if(count>=10 && count <= 99) nomor = "000";
    if(count >= 100 && count <= 999) nomor = "00";
    if(count >= 1000 && count <= 9999) nomor = "0";
    if(count >= 10000 && count <= 99999) nomor = "";

    menu.menu_code = code + inputTime + nomor + count;
    next();
});

module.exports = Config = mongoose.model("mst_menu", MstMenuSchema);
