const mongoose = require("mongoose");
const momentTimezone = require('moment-timezone')
momentTimezone.tz("Asia/Jakarta");
const localDate = require("../utils/localDate");

const MstClientSchema = new mongoose.Schema({
    client_code: {
        type: String
    },
    client_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    business_type: {
        type: String,
        required: true
    },
    account_type: {
      type: String,
      enum : ['free', 'premium'],
      default: 'free',
    },
    join_date: {
        type: Date
    },
    input_time: {
        type: Date,
        default: localDate,
    },
    edit_time: {
        type: Date,
        default: localDate,
    },
    count: {
        type: Number
    },
    active: {
        type: Number,
        default: 0
    }
}, { collection: 'mst_client' });
MstClientSchema.pre("save", async function(next) {
    const client = this;
    const inputTime = momentTimezone(client.input_time).format("YYYYMM");
    const inputMonth = momentTimezone(client.input_time).month();
    const inputYear = momentTimezone(client.input_time).year();
    let count = 1;
    let code = "CLT"
    client.count = count;
    
    const previousDocument = await client.constructor.findOne({
        input_time: { $lt: client.input_time },
    }).sort({ input_time: -1 });
    
    if(previousDocument) {
        const previousMonth = momentTimezone(previousDocument.input_time).month();
        const previousYear = momentTimezone(previousDocument.input_time).year();
        if(inputMonth > previousMonth || inputYear > previousYear) {
            count = 1;
            client.count = count;
        } else {
            count = previousDocument.count + 1;
            client.count = count;
        }
    }
    
    let nomor = "0000";
    if(count>=10 && count <= 99) nomor = "000";
    if(count >= 100 && count <= 999) nomor = "00";
    if(count >= 1000 && count <= 9999) nomor = "0";
    if(count >= 10000 && count <= 99999) nomor = "";

    client.client_code = code + inputTime + nomor + count;
    next();
});
module.exports = Config = mongoose.model("mst_client", MstClientSchema);
