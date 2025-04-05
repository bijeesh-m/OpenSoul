const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((conn) => console.log("Database connected"))
        .catch((err) => console.log(err.message));
};

module.exports = connectDB;
