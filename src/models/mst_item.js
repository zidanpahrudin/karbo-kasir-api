const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const momentTimezone = require('moment-timezone')
momentTimezone.tz("Asia/Jakarta");
const localDate = require("../utils/localDate");

const MstItemsSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId  
    },
    item_code: {
      type: String  
    },
    items_name: {
        type: String  
    },
    unit_name: {
        type: String  
    },
    item_kind: {
        type: String  
    },
    item_group: {
        type: String  
    },
    category: {
        type: String  
    },
    sub_category: {
        type: String  
    },
    is_package: {
      type: Number,
      default: 0 
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
}, { collection: 'mst_items' });

MstItemsSchema.pre("save", async function(next) {
    const item = this;
    const inputTime = momentTimezone(item.input_time).format("YYYYMM");
    const inputMonth = momentTimezone(item.input_time).month();
    const inputYear = momentTimezone(item.input_time).year();
    let count = 1;
    let code = "CLT"
    item.count = count;
    
    const previousDocument = await item.constructor.findOne({
        input_time: { $lt: item.input_time },
    }).sort({ input_time: -1 });
    
    if(previousDocument) {
        const previousMonth = momentTimezone(previousDocument.input_time).month();
        const previousYear = momentTimezone(previousDocument.input_time).year();
        if(inputMonth > previousMonth || inputYear > previousYear) {
            count = 1;
            item.count = count;
        } else {
            count = previousDocument.count + 1;
            item.count = count;
        }
    }
    
    let nomor = "0000";
    if(count>=10 && count <= 99) nomor = "000";
    if(count >= 100 && count <= 999) nomor = "00";
    if(count >= 1000 && count <= 9999) nomor = "0";
    if(count >= 10000 && count <= 99999) nomor = "";

    item.item_code = code + inputTime + nomor + count;
    next();
});

module.exports = MstItems = mongoose.model("mst_items", MstItemsSchema);
