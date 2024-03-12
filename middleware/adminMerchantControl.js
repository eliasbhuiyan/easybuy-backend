const User = require("../modal/userScema");
// ======= ============================ ================
// ======= Secured Admin Merchant Start ================
// ======= ============================ ================
async function adminMerchantControl(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
    const userId = req.headers.authorization.split("@")[1];
    const password = req.headers.authorization.split("@")[2];

    try {
        let user = await User.find({ _id: userId });
        if (user.length > 0) {
            if (password == process.env.SWTSECRT) {
                if (user[0].role == "admin" || user[0].role == "merchant") {
                    return next();
                } else {
                    return res.status(400).send({ error: "Not Found Data!" });
                }
            } else {
                return res.status(400).send({ error: "Authorization Failed!" });
            }
        } else {
            return res.status(400).send({ error: "Not Found Data!" });
        }
    } catch {
        return res.status(400).send({ error: "Not Found Data!" });
    }
}

module.exports = adminMerchantControl