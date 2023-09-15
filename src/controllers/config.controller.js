// models
const Config = require("../models/config");

module.exports = {
    create: async (req, res) => {
        try {
            const {
                type,
                value
            } = req.body;
            
            const config_obj = {};

            if(type) config_obj.cfg_type = type;
            if(value) config_obj.cfg_value = value;

            const new_config = new Config(config_obj);
            
            await new_config.save();
            
            return res.json({
                status: "success",
                message: "configurasi berhasil di simpan",
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