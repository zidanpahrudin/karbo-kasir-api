// models
const MstMenu = require("../models/mst_menu");
const MstClient = require("../models/mst_client");

module.exports = {
    fetch: async (req, res) => {
        const menu_id = req.params.menu_id;
        const menu_filter = {};
        menu_filter.active = 1;
        if(menu_id) menu_filter._id = menu_id;

        const menu = await MstMenu.find(menu_filter).sort({menu_name: 1}).lean();
        
        return  res.json({
            status: "success",
            message: "cabang di temukan",
            data: menu
        })
    },
    
    create: async (req, res) => {
        const {
            app_code,
            menu_name,
            menu_group
        } = req.body;

        const menu_obj = {};
        if(app_code) menu_obj.app_code = app_code;
        if(menu_name) menu_obj.menu_name = menu_name;
        if(menu_group) menu_obj.menu_group = menu_group;

        const new_menu = new MstMenu(menu_obj);
        await new_menu.save();

        return res.json({
            status: "success",
            message: "berhasil menambahkan menu",
            data: []
        })
    },
    update: async (req, res) => {
        const {
            app_code,
            menu_name,
            menu_group
        } = req.body;

        const menu_id = req.params.menu_id;

        const menu_obj = {};
        if(app_code) menu_obj.app_code = app_code;
        if(menu_name) menu_obj.menu_name = menu_name;
        if(menu_group) menu_obj.menu_group = menu_group;

        const menu = await MstMenu.findById(menu_id);
        if(!menu) {
            return res.json({
                status: "failed",
                message: "menu tidak di temukan",
                data: []
            })
        }

        await MstMenu.findOneAndUpdate({_id: menu._id}, menu_obj);
        return res.json({
            status: "success",
            message: "berhasil update menu",
            data: []
        })
    },
    remove: async (req, res) => {
        const client_id = req.user.client_id;
            const menu_id = req.params.menu_id;
            const client = await MstClient.findOne({_id: client_id, active: 1});
            if(!client) {
                return res.json({
                    status: "failed",
                    message: "client tidak di temukan",
                    data: []
                })
            }

            const menu_obj = {};
            menu_obj.active = 0;

            const menu = await MstMenu.findOne({_id: menu_id, active: 1}).lean();
            if(!menu) {
                return res.json({
                    status: "failed",
                    message: "cabang tidak di temukan",
                    data: []
                })
            }

            await MstMenu.findByIdAndUpdate(menu._id, menu_obj)

            return res.json({
                status: "success",
                message: "berhasil delete menu",
                data: []
            })
    },

}