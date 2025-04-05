const mongoose = require("mongoose");

const confessionGroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        groupIcon: {
            type: String,
            default: "https://res.cloudinary.com/dunf6rko6/image/upload/v1742383700/1330502_h2hmsy.jpg",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        confessions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Confession",
            },
        ],
    },
    { timestamps: true }
);

const ConfessionGroup = mongoose.model("ConfessionGroup", confessionGroupSchema);
module.exports = ConfessionGroup;
