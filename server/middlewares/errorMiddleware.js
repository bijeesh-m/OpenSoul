const { errorLogger } = require("./logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error to console (for development)
    console.error("Error:", err);

    // 🔥 Log error to file using Winston
    errorLogger.error({ message, stack: err.stack });

    res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
