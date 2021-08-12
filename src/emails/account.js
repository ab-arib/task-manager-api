const nodemailer = require('nodemailer')

// use dummy email from ethereal.email
const transporter = nodemailer.createTransport ({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        // user: 'alverta.medhurst@ethereal.email'
        user: process.env.USER,
        pass: process.env.PASS
    }
})

// example -- testing sending email
// transporter.sendMail({
//     from: 'Task Manager API <alverta.medhurst@ethereal.email>',
//     to: 'alverta.medhurst@ethereal.email',
//     subject: 'Thanks for joining!',
//     text: 'Sending email successfully',
//     html: `<b>Sending email succesfully</b>`
// })

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: 'Task Manager API <alverta.medhurst@ethereal.email>',
        to: email,
        subject: 'Thanks for joining!',
        text: `Welcome to our app, ${name}!`,
        html: `<b>Welcome to our app, ${name}!</b>`
    })
}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: 'Task Manager API <alverta.medhurst@ethereal.email>',
        to: email,
        subject: 'We\'re sorry to see you leave',
        text: `We hope to see you back again someday, ${name}!`,
        html: `<b>We hope to see you back again someday, ${name}!</b>`
    })
}
 
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}