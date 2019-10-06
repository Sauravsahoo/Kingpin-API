const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{

    sgMail.send({
        to : email,
        from : 'beetabooy123@gmail.com',
        subject :`Welcome to the KINGPIN Application ${name}` ,
        text : `Great !!! You\'re good to go ${name}`,

    })
}   

const sendCancelEmail = (email , name) =>{

    sgMail.send({
        to : email,
        from : 'beetabooy123@gmail.com',
        subject :`Good bye ${name} ` ,
        text : `We're sorry that you're leaving us ${name}. Please visit usnext time`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}