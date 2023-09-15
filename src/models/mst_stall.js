const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const localDate = require("../utils/localDate");
const momentTimezone = require('moment-timezone')
momentTimezone.tz("Asia/Jakarta");
const MstStallSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId
    },
    stall_code: {
        type: String
    },
    stall_name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    open_date: {
        type: Date
    },
    input_time: {
        type: Date,
        default: localDate
    },
    count: {
        type: Number
    },
    active: {
        type: Number,
        default: 1
    }
}, { collection: 'mst_stall' });


MstStallSchema.pre("save", async function(next) {
    const stall = this;
    const inputTime = momentTimezone(stall.input_time).format("YYYYMM");
    const inputMonth = momentTimezone(stall.input_time).month();
    const inputYear = momentTimezone(stall.input_time).year();
    let count = 1;
    let code = "STL"
    stall.count = count;
    
    const previousDocument = await stall.constructor.findOne({
        input_time: { $lt: stall.input_time },
    }).sort({ input_time: -1 });
    
    if(previousDocument) {
        const previousMonth = momentTimezone(previousDocument.input_time).month();
        const previousYear = momentTimezone(previousDocument.input_time).year();
        if(inputMonth > previousMonth || inputYear > previousYear) {
            count = 1;
            stall.count = count;
        } else {
            count = previousDocument.count + 1;
            stall.count = count;
        }
    }
    
    let nomor = "0000";
    if(count>=10 && count <= 99) nomor = "000";
    if(count >= 100 && count <= 999) nomor = "00";
    if(count >= 1000 && count <= 9999) nomor = "0";
    if(count >= 10000 && count <= 99999) nomor = "";

    stall.stall_code = code + inputTime + nomor + count;
    next();
});

module.exports = Config = mongoose.model("mst_stall", MstStallSchema);
