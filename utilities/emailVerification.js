const nodemailer = require("nodemailer");
module.exports = async function emailVerification(email, subject, templete){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
     
     await transporter.sendMail({
        from: `no reply" ${process.env.MAIL_USERNAME}`,
        to: email,
        subject: subject,
        html: templete,
      });
}