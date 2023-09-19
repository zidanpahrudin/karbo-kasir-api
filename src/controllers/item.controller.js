const MstItem = require("../models/mst_item");

module.exports = {
    create: async (req, res) => {
        try {
            const client_id = req.user.client_id;
            const user_id = req.user.id;
            const {
                items_name,
                unit_name,
                item_kind,
                item_group,
                category,
                sub_category,
                is_package,
                image_url,
                remarks,
            } = req.body;

            const item_obj = {};
            if (client_id) item_obj.client_id = client_id;
            if (items_name) item_obj.items_name = items_name;
            if (unit_name) item_obj.unit_name = unit_name;
            if (item_kind) item_obj.item_kind = item_kind;
            if (item_group) item_obj.item_group = item_group;
            if (category) item_obj.category = category;
            if (sub_category) item_obj.sub_category = sub_category;
            if (is_package) item_obj.is_package = is_package;
            if (image_url) item_obj.image_url = image_url;
            if (user_id) item_obj.pic = user_id;
            
            if (remarks) item_obj.remarks = remarks;

            const new_item = new MstItem(item_obj);
            await new_item.save();

            return res.json({
                status: "success",
                message: "berhasil menambahkan item",
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
    fetch: async (req, res) => {
        try {
            const item_id = req.params.item_id;
            const item_filter = {};
            item_filter.active = 1;
            if (item_id) item_filter._id = item_id;

            const item = await MstItem.find(item_filter).sort({ item_name: 1 }).lean();

            return res.json({
                status: "success",
                message: "item di temukan",
                data: item
            })
        } catch (err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            const client_id = req.user.client_id;
            const item_id = req.params.item_id;
            const user_id = req.user.id;
            const {
                items_name,
                unit_name,
                item_kind,
                item_group,
                category,
                sub_category,
                is_package,
                image_url,
                remarks,
            } = req.body;
            const item = await MstItem.findById(item_id);

            if(!item) {
                return res.json({
                    status: "failed",
                    message: "item tidak di temukan",
                    data: []
                })
            }

            const item_obj = {};
            if (client_id) item_obj.client_id = client_id;
            if (items_name) item_obj.items_name = items_name;
            if (unit_name) item_obj.unit_name = unit_name;
            if (item_kind) item_obj.item_kind = item_kind;
            if (item_group) item_obj.item_group = item_group;
            if (category) item_obj.category = category;
            if (sub_category) item_obj.sub_category = sub_category;
            if (is_package) item_obj.is_package = is_package;
            if (image_url) item_obj.image_url = image_url;
            if (user_id) item_obj.pic = user_id;
            
            if (remarks) item_obj.remarks = remarks;
            await MstItem.findOneAndUpdate({_id: item._id, active: 1}, {$set: item_obj});
            return res.json({
                status: "success",
                message: "berhasil mengupdate item",
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
    remove: async (req, res) => {
        try {
            const item_id = req.params.item_id;
            const item = await MstItem.findById(item_id);

            if(!item) {
                return res.json({
                    status: "failed",
                    message: "item tidak di temukan",
                    data: []
                })
            }

            const item_obj = {};
            item_obj.active = 0;
            await MstItem.findOneAndUpdate({_id: item._id, active: 1}, {$set: item_obj});
            return res.json({
                status: "success",
                message: "berhasil delete item",
                data: []
            })

        } catch (err) {
            res.json({
                status: "failed",
                message: 'server error : ' + err.message,
                data: []
            })
        }
    }
}