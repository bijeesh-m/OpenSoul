const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const notFoundRoute = require("./middlewares/notFoundRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());

require("dotenv").config();

connectDB();

app.use("/",(req,res)=>{
    res.send("Hello from server")
})

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


app.use(errorHandler);
app.use(notFoundRoute);

app.listen(process.env.PORT, (err) => {
    console.log(`server is running on port ${process.env.PORT}`);
});
