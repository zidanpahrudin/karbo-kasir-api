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
            let phoneEdit;
            if (phone) {
                phoneEdit = phone.replace(/^0+|^62+|^62/, "");
                client_obj.phone = phoneEdit;
            }
            const client = await MstClient.findOne({ phone: phoneEdit }).lean();

            if (client && client.active === 1) {
                return res.json({
                    status: "failed",
                    message: `gagal regisrasi client, karena number sudah di gunakan silahkan kontak ke admin`,
                    data: []
                })
            }

            
            if (client_name) client_obj.client_name = client_name;
            if (address) client_obj.address = address;
            if (business_type) client_obj.business_type = business_type;
            if (account_type) client_obj.account_type = account_type;

            if(!client) {
                const new_client = new MstClient(client_obj);
                await new_client.save();
            } else {
                await MstClient.findOneAndUpdate({ phone: phoneEdit }, client_obj);
            }


            return res.json({
                status: "success",
                message: "client berhasil daftar",
                data: []
            })
        }
        catch (err) {
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
        catch (err) {
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
        catch (err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    fetch: async (req, res) => {
        try {
            const client_id = req.params.client_id;
            const {
                is_active = 1,
                business_type
            } = req.body;
            
            const client_filter = {};
            const client_sort = {};
            client_sort.input_time = -1;

            if(is_active) client_filter.active = is_active;
            if(client_id) client_filter._id = client_id;
            if(business_type) client_filter.business_type = business_type;

            console.log(client_filter)

            const clients = await MstClient.find(client_filter).sort(client_sort);
            // clients.lii
            return res.json({
                status: "success",
                message: "clients di temukan",
                data: clients
            })
        }
        catch (err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
}