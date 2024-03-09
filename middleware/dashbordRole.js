const jwt = require("jsonwebtoken");
const dashbordRole = (req, res, next) => {
    const token = req.cookies;
    console.log(token);
    // const decoded = jwt.verify(token, process.env.JWT_SEC);

    // if (decoded.role == "admin" || decoded.role == "merchant") {
    //     next();
    // } else {
    //     res.redirect("/login");
    //     res.status(400).send({ error: "Authorization Failed! from middleware" });
    // }
};
module.exports = dashbordRole;