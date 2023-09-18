// models
const MstClient = require("../models/mst_client");
const MstUser = require("../models/mst_user");
const MstContract = require("../models/mst_contract");
const momentTimezone = require("moment-timezone");
const config = require("config");
momentTimezone.tz("Asia/Jakarta");

module.exports = {
    approval: async (req, res) => {
        try {
            const client_id = req.query.client_id;
            const {
                start_date,
                end_date,
                remarks 
            } = req.body;
                const contract_obj = {};
                const utc = new Date();
                let day = momentTimezone(utc.setHours(parseFloat(utc.getHours()) + parseFloat(config.get("UTC"))));
                const client = await MstClient.findOne({_id: client_id, active: 0}).lean();
                if(!client) {
                    return res.json({
                        status: "failed",
                        message: "client tidak di temukan",
                        data: []
                    })
                };

                // contract client 
                contract_obj.client_id = client._id;
                if(start_date) contract_obj.start_date = start_date;
                if(end_date) contract_obj.end_date = end_date;
                if(remarks) contract_obj.remarks = remarks;
                const new_contract = new MstContract(contract_obj);
                await new_contract.save();
                
                // client 
                const client_obj = {};
                client_obj.edit_time = day;
                client_obj.active = 1;
                if(!client.join_date) client_obj.join_date = day;
                await MstClient.findOneAndUpdate({ _id: client._id },{ $set: client_obj })
                
                // user client
                const user_obj = {};
                user_obj.client_id = client._id;
                user_obj.user_name = "admin";
                user_obj.user_password = "admin";
                user_obj.user_level = 1;
                user_obj.active = 1;
                const new_user = new MstUser(user_obj);
                await new_user.save();

                return res.json({
                    status: "success",
                    message: "client berhasil di approve",
                    data: []
                })
            

        } catch (err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    create: async (req, res) => {
        try {
            const {
                client_code,
                client_name,
                address,
                phone,
                business_type,
            } = req.body;

            const client_obj = {};

            if(client_code) client_obj.client_code = client_code;
            if(client_name) client_obj.client_name = client_name;
            if(address) client_obj.address = address;
            if(phone) client_obj.phone = phone;
            if(business_type) client_obj.business_type = business_type;


            const new_client = new MstClient(client_obj);

            await new_client.save();

            res.json({
                status: "success",
                message: "client berhasil daftar",
                data: []
            })
        }
    catch(err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            
        }
    catch(err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    delete: async (req, res) => {
        try {
            
        }
    catch(err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    fetch: async (req, res) => {
        try {
            
        }
    catch(err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
}