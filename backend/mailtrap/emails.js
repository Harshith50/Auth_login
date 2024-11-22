import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email send successfully", response);

    } catch (error) {
        console.error("Error sending email", error);
        throw new Error(`Error sending verication email :${error}`)
    }
}


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            template_uuid: "1555b25c-9290-43c1-ab0b-3376ef77176d",
            template_variables: {
                "company_info_name": "Test_Company_info_name",
                "name": "Test_Name"
            }
        })
        console.log('welcome email send successfully',response);
    } catch (error) {
    console.error( 'Error sending welcome email', error );

    throw new Error(`Error sending welcome eamil: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
        console.log('welcome email send successfully',response);
        
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}];
    try {
        const response = await client.send({
            from : sender,
            to : recipient,
            subject : "Password reset successfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password Reset"
        })
        console.log("Password reset email send successfully",response);
    } catch (error) {
        console.error(`Error sending password reset success email`,error);

        throw new Error(`Error sending password reset success email:${error}`)
    }
}