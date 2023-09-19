const multer = require('multer');
const path = require("path")
const fs = require("fs");
const config = require("config");

const DIR_UPLOADS_ROOT = config.get("ROOT_UPLOADS");

module.exports = {
    send: (req, res, next) => {
    
        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    const dir = `${DIR_UPLOADS_ROOT}/src/images/web`;
                    if(!fs.existsSync(dir)){
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    cb(null, "./public/src/images/web");
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + "_" + file.originalname);
                },
            })
        });
    
        return upload.single('image_item')(req, res, () => {
            try {
                if(req.file) {
                    console.log("file uploaded")
                } else {
                    console.log("file not upload")
                }
                next()
            } catch(err) {
                next()
                console.log(err.message)
            }
        })
    }
};





