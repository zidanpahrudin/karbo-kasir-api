const config = require("config");

// Function for Date Local Jakarta
const localDate = ({string = parseFloat(config.get("UTC"))}) => {
    const utc = new Date();
    
    return utc.setHours(parseFloat(utc.getHours()) + string);
};

module.exports = localDate;
