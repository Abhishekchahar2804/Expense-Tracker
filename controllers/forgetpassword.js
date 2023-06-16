const rootDir = require("../util/path");
const path = require("path");
// const sgMail = require('@sendgrid/mail');
const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

exports.forgetPassword = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgetpassword.html"));
};

exports.postForgetPassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    // sgMail.setApiKey('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')

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications["api-key"];

    apiKey.apiKey ="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";

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender ={
      email:"abhishekchahar2804@gmail.com"
    }
    const receivers=[{
      email:email
    }]

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Sending with SendGrid is Fun",
      textContent: "and easy to do anywhere, even with Node.js",
    })
    // await sgMail.send(msg);
    res.status(201).json({ message: "Link to reset password sent to your mail " });
  } catch (err) {
    console.log(err)
  }
};
