const mongoose = require('mongoose');
const config = require("config");
const db_url = config.get("database_user")
module.exports = async function connectDB() {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

