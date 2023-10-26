const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        // Tạo transporter 
        const transporter = nodemailer.createTransport({
            host: 'stmp.gmail.com',
            service: 'gmail',
            port: '587',
            secure: Boolean(true),
            auth: {
                user: 'truongthien2411@gmail.com',
                pass: 'jwdx fqki latn nzmg'
            }
        })
        await transporter.sendMail({
            from: 'truongthien2411@gmail.com',
            to: email,
            subject: subject,
            text: 'Confirm to register account',
            html: `<button style="background-color: green; color: white; border-radius: 5px; padding: 20px 50px; display: inline-block;" onclick={()=>{window.location.replace('${text}')}}>Confirm ${text}</button>`
        })
        console.log('Send email successfull')
    } catch (err) {
        console.log('err', err);
    }
}
