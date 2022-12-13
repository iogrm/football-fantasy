var nodemailer = require("nodemailer");
type Message = {
  subject: string;
  text: string;
};
export const sendMails = (emails: Array<string>, message: Message) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahnema.high5@gmail.com",
      pass: "jmagkkcenbcziqea",
    },
  });

  var mailOptions = {
    from: "rahnema.high5@gmail.com",
    to: emails,
    subject: message.subject,
    text: message.text,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: string }) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export const sendMail = (email: string, message: Message) => {
  sendMails([email], message);
};

export const setText = (title: string, code: number) => {
  const text = `Hi ${title}!
  Your verification code is ${code}.
  Enter this code in our High5 to activate your fantasy account.
  Click here ${"google.com"} to open the High5.
  If you have any questions, send us an email ${"rahnema.high5@gmail.com"}.
  We’re glad you’re here!
  The ${"High5"} team`;

  return text;
};
