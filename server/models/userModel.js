const mongoose = require("mongoose");

const generateRandomNickname = () => {
    const adjectives = ["Cool", "Silent", "Brave", "Witty", "Swift", "Mystic", "Bold", "Chill"];
    const nouns = ["Panda", "Fox", "Eagle", "Wolf", "Tiger", "Shark", "Owl", "Bear"];
    const randomNumber = Math.floor(Math.random() * 100);

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${randomNumber}`;
};

const userSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            default: generateRandomNickname,
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
        confessionGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ConfessionGroup",
            },
        ],
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
