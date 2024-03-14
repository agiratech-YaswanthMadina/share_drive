const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yaswanth35000@gmail.com',
        pass: 'bmct egzh pqca jzsp'
    }
});
 
// Setup email data
let mailOptions = {
    from: 'yaswanth35000@gmail.com',
    to: 'devipriyamohanraj01@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email from Node.js'
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
