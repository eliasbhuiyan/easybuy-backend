module.exports = function forgotpassTempete(token) {
    return `Click to verify account <a href="${process.env.BASE_URL}/forgotpassword?token=${token}">Click</a>`;
};

