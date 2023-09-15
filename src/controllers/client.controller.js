// models
const MstClient = require("../models/mst_client");
module.exports = {
    create: async (req, res) => {
        try {
            const {
                client_name,
                address,
                phone,
                business_type,
                account_type
            } = req.body;

            const client_obj = {};

            if(client_name) client_obj.client_name = client_name;
            if(address) client_obj.address = address;
            if(phone) client_obj.phone = phone;
            if(business_type) client_obj.business_type = business_type;
            if(account_type) client_obj.account_type = account_type;

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