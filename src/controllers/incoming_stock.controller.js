const TrnIncomingStock = require("../models/trn_incoming_stock");
const TrnIncomingDetail = require("../models/trn_incoming_detail");

module.exports = {
    create: async (req, res) => {
        try {
            const {
                item_id,
                stall_id,
                is_no,
                is_date,
                ref_no,
                is_type,
                is_cancel,
                pic,
                remarks,
                is_id,
                qty,
                item_price,
                shipping_cost,
                tax,
                other_cost,
                subtotal,
            } = req.body;
            const trn_incoming_stock_obj = {};
            if (item_id) trn_incoming_stock_obj.item_id = item_id;
            if (stall_id) trn_incoming_stock_obj.stall_id = stall_id;
            if (is_no) trn_incoming_stock_obj.is_no = is_no;
            if (is_date) trn_incoming_stock_obj.is_date = is_date;
            if (ref_no) trn_incoming_stock_obj.ref_no = ref_no;
            if (is_type) trn_incoming_stock_obj.is_type = is_type;
            if (is_cancel) trn_incoming_stock_obj.is_cancel = is_cancel;
            if (pic) trn_incoming_stock_obj.pic = pic;
            if (remarks) trn_incoming_stock_obj.remarks = remarks;

            const new_trn_incoming_stock = new TrnIncomingStock(trn_incoming_stock_obj);
            const trn_incoming_stock = await new_trn_incoming_stock.save();
            
            if (trn_incoming_stock) {
                const trn_incoming_detail_obj = {};
                if(is_id) trn_incoming_detail_obj.is_id = is_id;
                if(qty) trn_incoming_detail_obj.qty = qty;
                if(item_price) trn_incoming_detail_obj.item_price = item_price;
                if(shipping_cost) trn_incoming_detail_obj.shipping_cost = shipping_cost;
                if(tax) trn_incoming_detail_obj.tax = tax;
                if(other_cost) trn_incoming_detail_obj.other_cost = other_cost;
                if(subtotal) trn_incoming_detail_obj.subtotal = subtotal;

                const new_trn_incoming_detail = new TrnIncomingDetail(trn_incoming_detail_obj);
                await new_trn_incoming_detail.save();

                return res.json({
                    status: "success",
                    message: "berhasil menambahkan stock incoming",
                    data: []
                })
            }

        } catch(err) {
            return res.json({
                status: "failed",
                message: "server error, " + err.message,
                data: []
            })
        }
    },
    fetch: async (req, res) => {
        try {

        } catch(err) {
            return res.json({
                status: "failed",
                message: "server error, " + err.message,
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {

        } catch(err) {
            return res.json({
                status: "failed",
                message: "server error, " + err.message,
                data: []
            })
        }
    },
    remove: async (req, res) => {
        try {

        } catch(err) {
            return res.json({
                status: "failed",
                message: "server error, " + err.message,
                data: []
            })
        }
    }
}