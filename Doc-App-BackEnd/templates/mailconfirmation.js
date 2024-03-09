const sendEmail =require("../utils/nodemailer") 

const mailConfirmation = async (req, res, next) => {
    const { date, time, status, ticketPrice } = req.body.appointmentData;
    const email = req.body.email || "nitioffical4@gmail.com"; // Assuming email is present in the request body
    const subject = "Appointment Confirmation";

    const text = `
    Dear User,

    Your appointment has been successfully booked with the following details:

    Date: ${date}
    Time: ${time}
    Status: ${status}
    Ticket Price: ${ticketPrice}

    Thank you for choosing our service.

    Regards,
    [Your Company Name]
    `;

    const html = `
    <html>
    <head>
    </head>
    <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <p style="font-size: 16px;">Dear User,</p>
        <p style="font-size: 14px;">Your appointment has been successfully booked with the following details:</p>
        <ul style="font-size: 14px;">
            <li>Date: ${date}</li>
            <li>Time: ${time}</li>
            <li>Status: ${status}</li>
            <li>Ticket Price: ${ticketPrice}</li>
        </ul>
        <p style="font-size: 14px;">Thank you for choosing our service.</p>
        <p style="font-size: 14px;">Regards,<br>Healther Minds</p>
    </body>
    </html>
    `;

    try {
        await sendEmail(email, subject, text, html);
        console.log("Appointment confirmation email sent successfully.");
        res.status(200).json({ Emailmessage: "Appointment confirmation email sent successfully.",data:req.body });
    } catch (error) {
        console.error("Error sending appointment confirmation email:", error);
        res.status(500).json({ error: "Failed to send appointment confirmation email." });
    }
};

module.exports=mailConfirmation;
