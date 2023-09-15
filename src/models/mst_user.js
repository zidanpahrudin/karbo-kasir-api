const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
/**
* level user:  
* 1. owner = full akses ke setiap menu 
* 2. svp = akses ke cabang / multi cabang
* 3. kasir = akses cabang kasir tersebut
*/

const MstUserSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId
    },
    user_name: {
        type: String
    },
    user_password: {
        type: String
    },
    user_level: {
        type: Number
    },
    active: {
        type: Number  
    }
}, { collection: 'mst_user' });

MstUserSchema.pre("save", function(next) {
    const user = this;

    if(!user.isModified('user_password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.user_password, salt, function(err, hash) {
            if(err) return next(err);

            user.user_password = hash;
            next();
        })
    });
});

MstUserSchema.methods.comparePassword = function(user_password) {
    return bcrypt.compareSync(user_password, this.user_password);
};

MstUserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        level_user: this.user_level,
        client_id: this.client_id,
    }
    return jwt.sign(payload, config.get("JWT_SECRET"), {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    })

};

module.exports = MstUser = mongoose.model("mst_user", MstUserSchema);
