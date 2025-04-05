const notFoundRoute = (req, res, next) => {
    console.log("This route is not defined!");
    res.status(500).json({ message: "Ivalid route!" });
};

module.exports = notFoundRoute;
