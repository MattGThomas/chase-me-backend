const router = require("express").Router();
const Requests = require("./requests-model.js");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  Requests.getRequests()
    .then((requests) => {
      res.status(200).json(requests);
    })
    .catch((err) => {
      res.status(500).json({
        message: "there was an error getting the requests",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Requests.getRequestsById(id)
    .then((request) => {
      console.log(request);
      if (request) {
        res.status(200).json(request);
        // next();
      } else {
        res.status(404).json({
          message: "there is no quest with the given id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "there was an error processing your request",
      });
    });
});

router.post("/", (req, res) => {
  const requestInfo = { ...req.body };
  Requests.addRequest(requestInfo)
    .then((request) => {
      res.status(200).json(request);
      const smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.gmail_user,
          pass: process.env.gmail_pass,
        },
      });

      const mailOpts = {
        from: "Your sender info here", // This is ignored by Gmail
        to: process.env.email_two,
        subject: "New message from contact form at chase-me-productions",
        text: `You have a new message Name: ${requestInfo.firstName} Last Name: ${requestInfo.lastName} Email: ${requestInfo.email} Phone: ${requestInfo.phone} Message: ${requestInfo.message} `,
        html: `Chase, you have a new message
        <br/><br/> <strong>Client Name:</strong> <span>${requestInfo.firstName} </span>
        <br/> <strong>Client Last Name:</strong> ${requestInfo.lastName}
        <br/><br/> <strong>Client Email:</strong> ${requestInfo.email}
        <br/> <strong>Client Phone Number:</strong> ${requestInfo.phone}
        <br/><br/> <strong>Client Message:</strong> ${requestInfo.message}`,
      };

      smtpTrans.sendMail(mailOpts, (error, res) => {
        if (error) {
          console.log("it failed, here why: ", error);
        } else {
          console.log("the email sent succesfully", res);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "there was an error adding the request",
      });
    });
});

router.delete("/:id", (req, res) => {
  Requests.deleteRequest(req.params.id).then((count) => {
    if (count > 0) {
      res.send(200).json({
        message: "Christmas was successfully cancelled on the request",
      });
    } else {
      res.status(500).json({
        message: "the request will still have Christmas",
      });
    }
  });
});

module.exports = router;
