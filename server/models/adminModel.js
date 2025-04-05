const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        adminID: {
            type: String,
            default: "admin@opensoul",
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "Admin",
        },
    },
    { timestamps: true }
);

const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
