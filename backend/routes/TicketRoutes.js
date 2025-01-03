const EventModel = require('../Database/Models/EventModel');
const TicketModel = require('../Database/Models/TicketModel');
const QRCode = require('qrcode');
const sendEmail = require('../service/emailSender');


const TicketRoutes = require('express').Router();

TicketRoutes.post('/request-ticket', async (req, res) => {

    try {
        const { event, customer } = req.body;

        const Ticket = new TicketModel({
            event: event,
            customer: customer,
            status: 'requested'
        })

        await Ticket.save();

        res.json({
            message: "Ticket requested",
            ticket: Ticket,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
})

// Create Ticket Route
TicketRoutes.post('/create-ticket', async (req, res) => {
    const { eventID, customerID, ticketCount } = req.body;

    // Validate request body
    if (!eventID || !customerID || !ticketCount) {
        return res.status(400).json({
            success: false,
            message: "eventID, customerID, and ticketCount are required fields."
        });
    }

    if (typeof ticketCount !== 'number' || ticketCount <= 0) {
        return res.status(400).json({
            success: false,
            message: "ticketCount must be a positive number."
        });
    }

    try {
        // Create a new ticket
        const ticket = new TicketModel({
            event: eventID,
            customer: customerID,
            count: ticketCount,
        });

        // Save ticket to the database
        await ticket.save();

        //update the attandee in events
        const event = await EventModel.findById(eventID);
        if (!event) {
            return res.json({
                success: false,
                message: "Event not found"
            })
        }
        event.tickets.push(ticket._id);
        await event.save();

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            ticket: ticket,  // Send the created ticket object back
        });
    } catch (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating ticket. Please try again later.",
            error: error.message
        });
    }
});

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

        await sendEmail(customer.email, "Ticket Approved", "", `
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

TicketRoutes.get('/bought/:customerID', async (req, res) => {
    const { customerID } = req.params;
    try {
        const BoughtTickets = await TicketModel.find({ customer: customerID })
            .populate('event')  // Populate event
            .populate('customer')  // Populate customer
            .populate({
                path: 'event',
                populate: {
                    path: 'organizer',  // Make sure this references 'user' model
                    model: 'user'  // The model name should be 'user' (as in the schema reference)
                }
            });

        res.json({
            success: true,
            boughtTickets: BoughtTickets
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error fetching tickets",
            error: error.message
        });
    }
});

TicketRoutes.post('/check-ticket-bought', async (req, res) => {
    try {
        const { user_id, event_id } = req.body;
        const ticket =await TicketModel.findOne({
            event: event_id,
            customer: user_id
        })
        //console.log(user_id, event_id);
        //console.log(ticket)
        if (ticket) {
            res.json({ status: true, message: "Ticket already bought" })
        }
        else {
            res.json({ status: false, message: "Ticket not bought" })
        }
    }
    catch (error) {
        console.error("Error checking ticket bought:", error);
        return res.json({
            status : null,
            message: error.message,
            success: false
        });
    }
})

module.exports = TicketRoutes;