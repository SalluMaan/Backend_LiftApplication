const nodemailer = require("nodemailer");
const ejs = require("ejs");
const rootPath = require("../rootPath");
const path = require("path");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

console.log(process.env.user);
const createEmailOption = ({ receipentEmail, subject, body, html }) => ({
  from: process.env.user,
  to: receipentEmail,
  ...(subject && { subject }),
  ...(body && { body }),
  html,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("error in verifying transporter", error.message);
    // next(error);
    return; //next(error.message);
  }
  console.log("email server is ready");
});

const parseEmailTemplate = async (templateType, reqBody, next) => {
  // try {
  let template = null;
  let subject = null;
  switch (templateType) {
    case "signup":
      template = "signUpTemplate.ejs";
      subject = "User Registeration";
      break;
    case "accountVerification":
      template = "activateAccount.ejs";
      subject = "Account Activation";
      break;
    case "requestForgotPassword":
      template = "requestForgotPassword.ejs";
      subject = "Reset Password";
    default:
      template;
  }

  if (!template) return next("target template not exist");

  template = path.join(rootPath, "utils", "emails", "templates", template);

  const html = await ejs.renderFile(template, reqBody);

  if (html) {
    return { html, subject };
  }
  return { html: null, subject };
  // } catch (exceptionError) {
  //  console.log("parsing error");
  //  next(exceptionError.message);
  //  return;
  // }
};

const sendEmail = async (templateType, reqData, next) => {
  //try {
  const template = await parseEmailTemplate(templateType, reqData, next);

  const mailOption = createEmailOption({
    receipentEmail: reqData.email,
    html: template.html,
    subject: template.subject,
  });
  return await transporter.sendMail(mailOption);
  // const sendInfo = await transporter.sendMail(mailOption);
  // if (sendInfo) {
  //   res.send({
  //     email_success: `${templateType} email send successfully to ${reqData.email}`,
  //   });
  // }
  //} catch (error) {
  //   console.log("sending error");

  //   next(error);
  //   return;
  // }
};

module.exports = sendEmail;
