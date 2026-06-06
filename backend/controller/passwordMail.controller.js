import nodemailer from "nodemailer"


const forgotPasswordMail = async (email,passwordResetToken) => {
    try {
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "me",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            },
        });

      const info =  await transporter.sendMail(
            {
                from: "sender@server.com",
                to: email,
                subject: "ERP PASSWORD RESET",
                html: `
                        <a href="${process.env.FRONTEND_URL}/reset-password?token=${passwordResetToken}">
                            Reset Password
                        </a>
                        `
            },
        );
        return info;

    }catch(err) {
        console.log("Mail sending error: ", err);
    }


}

export default forgotPasswordMail;