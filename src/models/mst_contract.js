const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const momentTimezone = require('moment-timezone');
const localDate = require("../utils/localDate");

const MstContractSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId
    },
    contract_no: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    contract_count: {
        type: Number
    },
    input_time: {
        type: Date,
        default: localDate,
    },
    remarks: {
        type: String  
    },
    active: {
        type: Number,
        default: 1
    }
}, { collection: 'mst_contract' });

// bug
MstContractSchema.pre("save", async function(next) {
    const contract = this;
    const inputTime = momentTimezone(contract.input_time).format("YYYYMM");
    const inputMonth = momentTimezone(contract.input_time).month();
    const inputYear = momentTimezone(contract.input_time).year();
    let count = 1;
    let code = "CTR"
    contract.contract_count = count;
    
    const previousDocument = await contract.constructor.findOne({
        input_time: { $lt: contract.input_time },
    }).sort({ input_time: -1 });
    
    if(previousDocument) {
        const previousMonth = momentTimezone(previousDocument.input_time).month();
        const previousYear = momentTimezone(previousDocument.input_time).year();
        if(inputMonth > previousMonth || inputYear > previousYear) {
            count = 1;
            contract.contract_count = count;
        } else {
            count = previousDocument.contract_count + 1;
            contract.contract_count = count;
        }
        
    }
    
    let nomor = "0000";
    if(count>=10 && count <= 99) nomor = "000";
    if(count >= 100 && count <= 999) nomor = "00";
    if(count >= 1000 && count <= 9999) nomor = "0";
    if(count >= 10000 && count <= 99999) nomor = "";

    contract.contract_no = code + inputTime + nomor + count;
    next();
});

module.exports = Config = mongoose.model("mst_contract", MstContractSchema);
