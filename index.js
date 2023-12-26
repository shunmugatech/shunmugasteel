const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

exports.sendEmail = functions.database
  .ref("/emails/{emailId}")
  .onCreate((snapshot, context) => {
    const emailData = snapshot.val();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });

    const mailOptions = {
      from: gmailEmail,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  });
