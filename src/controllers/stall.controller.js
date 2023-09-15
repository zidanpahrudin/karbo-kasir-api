const MstStall = require("../models/mst_stall");
const MstClient = require("../models/mst_client");
module.exports = {
    create: async (req, res) => {
        try {
            const {
                stall_name,
                address,
                phone,
                open_date,
            } = req.body;

            const client_id = req.user.client_id;
            const client = await MstClient.findOne({_id: client_id, active: 1});
            if(!client) {
                return res.json({
                    status: "failed",
                    message: "client tidak di temukan",
                    data: []
                })
            }
            const stall_obj = {};

            stall_obj.client_id = client._id;
            if (stall_name) stall_obj.stall_name = stall_name;
            if (address) stall_obj.address = address;
            if (phone) stall_obj.phone = phone;
            if (open_date) stall_obj.open_date = open_date;

            const new_stall = new MstStall(stall_obj);
            await new_stall.save();

            return res.json({
                status: "success",
                message: "berhasil menambahakan cabang",
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
            const {
                stall_name,
                address,
                phone,
                open_date,
            } = req.body;

            console.log(req.user)
            const client_id = req.user.client_id;
            const stall_id = req.params.stall_id;
            const client = await MstClient.findOne({_id: client_id, active: 1});
            if(!client) {
                return res.json({
                    status: "failed",
                    message: "client tidak di temukan",
                    data: []
                })
            }
            const stall_obj = {};

            // stall_obj.client_id = client._id;
            if (stall_name) stall_obj.stall_name = stall_name;
            if (address) stall_obj.address = address;
            if (phone) stall_obj.phone = phone;
            if (open_date) stall_obj.open_date = open_date;

            const stall = await MstStall.findOne({_id: stall_id, active: 1}).lean();
            if(!stall) {
                return res.json({
                    status: "failed",
                    message: "cabang tidak di temukan",
                    data: []
                })
            }

            await MstStall.findByIdAndUpdate(stall._id, stall_obj)

            return res.json({
                status: "success",
                message: "berhasil mengupdate cabang",
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
    remove: async (req, res) => {
        try {
            const client_id = req.user.client_id;
            const stall_id = req.params.stall_id;
            const client = await MstClient.findOne({_id: client_id, active: 1});
            if(!client) {
                return res.json({
                    status: "failed",
                    message: "client tidak di temukan",
                    data: []
                })
            }
            const stall_obj = {};

            stall_obj.active = 0;

            const stall = await MstStall.findOne({_id: stall_id, active: 1}).lean();
            if(!stall) {
                return res.json({
                    status: "failed",
                    message: "cabang tidak di temukan",
                    data: []
                })
            }

            await MstStall.findByIdAndUpdate(stall._id, stall_obj)

            return res.json({
                status: "success",
                message: "berhasil delete cabang",
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
    fetch: async (req, res) => {
        try {
            const stall_id = req.params.stall_id;
            const stall_filter = {};
            stall_filter.active = 1;
            if(stall_id) stall_filter._id = stall_id;

            const stall = await MstStall.find(stall_filter).sort({stall_name: 1}).lean();
            
            return  res.json({
                status: "success",
                message: "cabang di temukan",
                data: stall
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
