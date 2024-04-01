const User = require("../modal/userScema");
// =============== ==================== ================
// =============== Secured Admin Start ================
// =============== ==================== ================
async function publicRoute(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
    const userId = req.headers.authorization.split("@")[1];
    const password = req.headers.authorization.split("@")[2];

    try {
        if (password === process.env.SWTSECRT && userId === "easybuypublicrouteaccess") {
            return next();
        } else {
            return res.status(400).send({ error: "Authorization Failed!" });
        }

    } catch {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
}

module.exports = publicRoute;