const EventModel = require('../Database/Models/EventModel');
const UserModel = require('../Database/Models/UserModel');
const sendEmail = require('../service/emailSender');
const EmailRouter = require('express').Router();

EmailRouter.post('/send-email', async (req, res) => {
    try {
        const { to, subject, body, html } = req.body;

        // Validation check
        if (!to || !subject || !body) {
            return res.status(400).json({ message: "Missing required fields: 'to', 'subject', and 'body' are required" });
        }

        await sendEmail(to, subject, body, html);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error occurred while sending the email" });
    }
});

EmailRouter.get('/accept-ticket-request/:organizerID/:targetEmail', async (req, res) => {
    try {
        const organizerID = req.params.organizerID;
        const target = req.params.targetEmail;

        // Fetch the organizer's details
        const Organizer = await UserModel.findOne({ _id: organizerID });

        if (Organizer) {
            // Fetch the event details for the given organizer
            const Eventdata = await EventModel.findOne({ organizer: organizerID });

            if (Eventdata) {
                const qrURL = Eventdata.qrURL; // URL to the QR code image
                console.log(qrURL)
                const eventPrice = Eventdata.price; // Event price

                // Define the email subject
                const subject = `Your QR Code for ${Eventdata.name} Ticket Purchase`;

                // Define the email body (plain text)
                const body = `Hello,\n\nYou have successfully requested a ticket for the event "${Eventdata.name}". To complete your purchase, please scan the QR code below. The ticket price is $${eventPrice}.\n\nBest regards,\nEvent Team`;

                // Define the email HTML content
                const html = `
                    <html>
                        <body>
                            <h2>Ticket Purchase for "${Eventdata.name}"</h2>
                            <p>Hello,</p>
                            <p>You have successfully requested a ticket for the event <strong>"${Eventdata.name}"</strong>. To complete your purchase, please scan the QR code below. The ticket price is <strong>$${eventPrice}</strong>.</p>
                            <div style="text-align:center;">
                                <img src="${qrURL}" alt="QR Code for Payment" style="width:200px;height:200px;margin-top:20px;" />
                            </div>
                            <p>Best regards,<br>Event Team</p>
                        </body>
                    </html>
                `;

                // Send the email
                await sendEmail(target, subject, body, html);

                res.status(200).json({ message: 'Ticket request accepted and email sent successfully' });
            } else {
                res.status(404).json({ message: "Event not found for the given organizer" });
            }
        } else {
            res.status(404).json({ message: "Organizer not found" });
        }
    } catch (error) {
        console.error("Error processing the ticket request:", error);
        res.status(500).json({ message: "An error occurred while processing the request" });
    }
});



module.exports = EmailRouter;
