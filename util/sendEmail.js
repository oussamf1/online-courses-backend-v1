const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, encodedString) => {
  try {
    let tansporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    msg = {
      from: process.env.USER,
      to: "tibor@hkcodingcamp.com",
      // to: `${email}`,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: "invoice.pdf",
          content: encodedString,
          encoding: "base64",
        },
        // { filename: "text1.txt", content: "hello world!" },
      ],
    };
    const info = await tansporter.sendMail(msg);
    console.log(info);

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
