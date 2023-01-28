import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASS, // generated ethereal password
  },
};

const transpoter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});


/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "useremail" : "admin123"
  "text" : ""
  "subject" : ""
}
*/
export const registerMail = async (req, res, next) => {
  const { username, useremail, text, subject } = req.body;
  try {
    var email = {
      body: {
        name: username,
        intro: text || "Welcome Saurabh !!",
        outro: "Need help, or have questions ?",
      },
    };

    var emailbody = MailGenerator.generate(email);

    let message = {
      from: ENV.EMAIL,
      to: useremail,
      subject: subject || "default subject line",
      html: emailbody,
    };

    transpoter
      .sendMail(message)
      .then(() => {
        return res.status(200).send({ mgs: "You should receive mail" });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  } catch (error) {
    return res.status(500).send("Unable to generate mail");
  }
};
