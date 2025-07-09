const nodemailer = require("nodemailer");

const { RESUME_PATH } = require("./constants");
const { transporter } = require("../services/emailPool");

const fillTemplate = (template, data) =>
  template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");

const sendEmail = async (to, subject, html) => {
  try {
    const htmlBody = html.replace(/(?:\r\n|\r|\n)/g, "<br/>");

    console.log("passs", process.env.MAIL_PASS);
    const result = await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to,
      subject,
      html: htmlBody,
      attachments: [
        {
          filename: "Harshita_Rajpal.pdf",
          path: RESUME_PATH,
          contentType: "application/pdf",
        },
      ],
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  fillTemplate,
  sendEmail,
};
