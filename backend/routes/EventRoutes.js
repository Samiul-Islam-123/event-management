const express = require('express');
const EventModel = require('../Database/Models/EventModel');
const upload = require('../config/multer');
const EventRouter = express.Router();
const cloudinary = require('../config/cloudinary');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Route to create payment intent
EventRouter.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Amount should be passed from the frontend

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in the smallest currency unit (e.g., cents)
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

EventRouter.post('/poster',upload.single('poster'), async(req,res) => {
    if (req.file) {
        //console.log('file found');
        const result = await cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'event_posters',
        }, async (error, result) => {
            if (error) {
                throw new Error('Failed to upload image');
            }
            // Get the secure URL from Cloudinary
            posterUrl = result.secure_url;
            res.json({
                success: true,
                message: "Poster Uploaded successfully",
                url : posterUrl
            });
        }).end(req.file.buffer);
    } else {
        return res.json({
            success: false,
            message: "Image is required"
        });
    }
})

// Create Event with Poster Image
EventRouter.post('/', async (req, res) => {
    const { name, description, date, limit, location, organizer, attendees, price, posterURL } = req.body;

    if (name && description && date && location && organizer) {
        try {
            // Check for existing event to prevent duplicates
            const existingEvent = await EventModel.findOne({
                name,
                date,
                organizer
            });

            if (existingEvent) {
                return res.json({
                    success: false,
                    message: 'Event already exists with the same name, date, and organizer.'
                });
            }


            // Create new event with poster URL
            const newEvent = new EventModel({
                name,
                description,
                date,
                limit,
                location,
                organizer,
                attendees,
                poster: posterURL,
                price
            });

            await newEvent.save();
            res.json({
                success: true,
                message: "Event created successfully",
                event: newEvent
            });

        } catch (error) {
            res.json({
                success: false,
                message: "Error creating event",
                error: error.message
            });
        }
    } else {
        res.json({
            success: false,
            message: "Missing required fields"
        });
    }
});

// Get Event by ID
EventRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const event = await EventModel.findById(id).populate('organizer').populate('attendees');

            if (event) {
                res.json({
                    success: true,
                    event
                });
            } else {
                res.json({
                    success: false,
                    message: "Event not found"
                });
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Error fetching event",
                error: error.message
            });
        }
    } else {
        res.json({
            success: false,
            message: "Event ID required"
        });
    }
});


EventRouter.get('/my-events/:userId', async (req, res) => {
    const { userId } = req.params;

    if (userId) {
        try {
            // Fetch events where the user is the organizer
            const events = await EventModel.find({ organizer: userId })
                .populate('organizer')
                .populate('attendees');

            if (events.length > 0) {
                res.json({
                    success: true,
                    events // Return the list of events
                });
            } else {
                res.json({
                    success: false,
                    message: "No events found for this organizer"
                });
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Error fetching events",
                error: error.message
            });
        }
    } else {
        res.json({
            success: false,
            message: "User ID required"
        });
    }
});

// Get All Events
EventRouter.get('/', async (req, res) => {
    try {
        const events = await EventModel.find().populate('organizer').populate('attendees');
        res.json({
            success: true,
            events
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error fetching events",
            error: error.message
        });
    }
});



// Update Event by ID
EventRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, date, limit, location, organizer, attendees } = req.body;

    if (id) {
        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(
                id,
                { name, description, date, limit, location, organizer, attendees },
                { new: true, runValidators: true }
            ).populate('organizer').populate('attendees');

            if (updatedEvent) {
                res.json({
                    success: true,
                    message: "Event updated successfully",
                    event: updatedEvent
                });
            } else {
                res.json({
                    success: false,
                    message: "Event not found"
                });
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Error updating event",
                error: error.message
            });
        }
    } else {
        res.json({
            success: false,
            message: "Event ID required"
        });
    }
});

// Delete Event by ID
EventRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const deletedEvent = await EventModel.findByIdAndDelete(id);

            if (deletedEvent) {
                res.json({
                    success: true,
                    message: "Event deleted successfully"
                });
            } else {
                res.json({
                    success: false,
                    message: "Event not found"
                });
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Error deleting event",
                error: error.message
            });
        }
    } else {
        res.json({
            success: false,
            message: "Event ID required"
        });
    }
});

module.exports = EventRouter;
