const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        required: true,
    },

    mail:{
        type: String,
        unique: true,
        required: true,
    },

    phoneNumber:{
        type: Number,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema)