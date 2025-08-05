const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const notFoundRoute = require("./middlewares/notFoundRoute");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
// app.use(cors());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());

require("dotenv").config();

connectDB();



app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(errorHandler);
app.use(notFoundRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
