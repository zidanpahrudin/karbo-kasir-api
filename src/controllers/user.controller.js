const MstUser = require("../models/mst_user");
const MstClient = require("../models/mst_client");
const UserMenu = require("../models/user_menu");

module.exports = {
    login: async (req, res) => {
        try {
            const {
                user_name,
                user_password
            } = req.body;
            const user = await MstUser.findOne({ user_name: user_name, active: 1 });
            if (!user) {
                return res.json({
                    status: "failed",
                    message: "user tidak di temukan",
                    data: []
                })
            }

            //validate password
            if (!user.comparePassword(user_password)) {
                return res.json({
                    status: "failed",
                    message: 'username password salah',
                    data: []
                });
            }
            // client
            const client = await MstClient.findById(user.client_id);
            const response_user = {};
            response_user._id = user._id,
            response_user.client_id = user.client_id,
            response_user.user_name = user.user_name,
            response_user.user_level = user.user_level,
            response_user.client_name = client.client_name;
            response_user.token = user.generateJWT();

            return res.json({
                status: "success",
                message: "berhasil login",
                data: [response_user]

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
                user_name,
                user_password,
                user_level,
                menu_ids,
                stall_ids,
            } = req.body;
            const client_id = req.user.client_id;
            const user_id = req.user.id;
            const user_obj = {};
            user_obj.client_id = client_id;
            if (user_name) user_obj.user_name = user_name;
            if (user_password) user_obj.user_password = user_password;
            if (user_level) user_obj.user_level = user_level;

            const new_user = new MstUser(user_obj);
            await new_user.save();

            const user_menu = [];
            if (menu_ids.length > 0) {
                for (const menu_id of menu_ids) {
                    user_menu.push({
                        user_id: user_id,
                        menu_id: menu_id
                    });
                }
            }
            await UserMenu.insertMany(user_menu);

            const user_stall = [];
            if (stall_ids.length > 0) {
                for (const stall_id of stall_ids) {
                    user_menu.push({
                        user_id: user_id,
                        menu_id: menu_id
                    });
                }
            }


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