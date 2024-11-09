const EventModel = require('../Database/Models/EventModel');
const TicketModel = require('../Database/Models/TicketModel');
const QRCode = require('qrcode');
const sendEmail = require('../service/emailSender');


const TicketRoutes = require('express').Router();

TicketRoutes.post('/request-ticket', async(req,res) => {
    
    try{
        const {event, customer} = req.body;
    
        const Ticket = new TicketModel({
            event : event,
            customer : customer,
            status : 'requested'
        })
    
        await Ticket.save();
    
        res.json({
            message : "Ticket requested",
            ticket : Ticket,
            success : true
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
})

TicketRoutes.get('/ticket-requests/:organizerID', async (req, res) => {
    const { organizerID } = req.params;

    try {
        // Find events organized by the specified organizer
        const events = await EventModel.find({ organizer: organizerID });

        // Extract the event IDs from the events
        const eventIds = events.map(event => event._id);

        // Find tickets with status "requested" for these events
        const requestedTickets = await TicketModel.find({
            event: { $in: eventIds },
            status: "requested"
        }).populate('event').populate('customer');

        res.status(200).json(requestedTickets);
    } catch (error) {
        console.error("Error fetching ticket requests:", error);
        res.status(500).json({ message: "An error occurred while fetching ticket requests" });
    }
});

TicketRoutes.post('/approve-ticket', async (req, res) => {
    const { ticketID } = req.body;

    try {
        // Find the ticket by ID and update its status to "approved"
        const updatedTicket = await TicketModel.findByIdAndUpdate(
            ticketID,
            { status: "approved" },
            { new: true } // This option returns the updated document
        )
        .populate({
            path: 'event',
            populate: { path: 'organizer', model: 'user' } // Populate the organizer in the event as well
        })
        .populate('customer'); // Populate the customer directly

        // Check if the ticket was found and updated
        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        // Extract event and customer details
        const { event, customer } = updatedTicket;
        const ticketDetails = `
            Event: ${event.name}
            Date: ${event.date}
            Location: ${event.location}
            Customer: ${customer.username}
        `;

        //console.log(customer)
        // Generate a QR code from the ticket details
        const qrCodeDataUrl = await QRCode.toDataURL(ticketDetails);

        await sendEmail(customer.email, "Ticket Approved", "",`
                <h3>Your Ticket for ${event.name}</h3>
                <p>Dear ${customer.username},</p>
                <p>Congratulations! Your ticket has been approved. Below are the event details:</p>
                <ul>
                    <li><strong>Event Name:</strong> ${event.name}</li>
                    <li><strong>Date:</strong> ${event.date}</li>
                    <li><strong>Location:</strong> ${event.location}</li>
                    <li><strong>Price:</strong> $${event.price}</li>
                </ul>
                <p>Scan the QR code below at the event venue:</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
                <p>Thank you for choosing our service. We hope you enjoy the event!</p>
            `);

        res.status(200).json({
            message: "Ticket approved successfully",
            ticket: updatedTicket,
            success: true
        });
    } catch (error) {
        console.error("Error approving ticket:", error);
        res.status(500).json({ success: false, message: "An error occurred while approving the ticket" });
    }
});

module.exports = TicketRoutes;