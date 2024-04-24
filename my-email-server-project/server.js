const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sangram.gupta@gmail.com",
    pass: "curqmczmugvqgmxn",
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); // Serve static files from the 'static' directory

// Serve your form at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html")); // Ensure the path matches your HTML file's location
});

// Handle form submission
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "sangram.gupta@gmail.com",
    subject: "Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Redirect or send a message after sending the email
    res.send("Thank you for your message. We will get back to you soon.");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
