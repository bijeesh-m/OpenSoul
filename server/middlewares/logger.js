const { createLogger, transports, format } = require("winston");
const path = require("path");

const errorLogger = createLogger({
    level: "error",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack ? `\nStack: ${stack}` : ""}`;
        })
    ),
    transports: [new transports.File({ filename: path.join(__dirname, "../logs/errors.log") })],
});

const activityLogger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [new transports.File({ filename: path.join(__dirname, "../logs/activity.log") })],
});

module.exports = { errorLogger, activityLogger };
