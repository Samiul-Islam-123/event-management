const express = require('express');
const EventModel = require('../Database/Models/EventModel');
const upload = require('../config/multer');
const EventRouter = express.Router();
const cloudinary = require('../config/cloudinary');
const UserModel = require('../Database/Models/UserModel');

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
    const { name, description, date, limit, location, organizer, tickets, price, posterURL } = req.body;

    if (name && description && date && location && organizer) {
        try {
            // Check if the organizer exists in the UserModel
            let existingOrganizer = await UserModel.findOne({ _id: organizer }); 

            if (!existingOrganizer) {
                return res.json({
                    success : false,
                    message: "Organizer not found"
                })

                
            }

            else if(!existingOrganizer.stripe_id){

                const [firstName, lastName] = existingOrganizer.username.split(" ");
                
                // Create a Stripe Express account for the organizer
                const account = await stripe.accounts.create({
                    type: 'standard',
                    email: existingOrganizer.email,
                    country: 'FR',
                    business_type: 'individual', // or 'company', depending on the organizer type
                    individual: {
                        first_name: firstName,
                        last_name: lastName,
                    }
                });
                
                // Save the Stripe account ID to the UserModel
                existingOrganizer.stripe_id = account.id; // Store Stripe ID in the User model
                
                await existingOrganizer.save(); // Save the new organizer with Stripe ID
            }

            // Check for existing event to prevent duplicates
            const existingEvent = await EventModel.findOne({
                name,
                date,
                organizer: existingOrganizer._id // Use the organizer ID here
            });

            if (existingEvent) {
                return res.json({
                    success: false,
                    message: 'Event already exists with the same name, date, and organizer.'
                });
            }

            // Create new event with the organizer's ID and poster URL
            const newEvent = new EventModel({
                name,
                description,
                date,
                limit,
                location,
                organizer: existingOrganizer._id, // Use the organizer's ID
                tickets,
                poster: posterURL,
                price
            });

            await newEvent.save();

            // Respond with success and event details
            res.json({
                success: true,
                message: "Event created successfully",
                event: newEvent
            });

        } catch (error) {
            console.log(error)
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
            const event = await EventModel.findById(id).populate('organizer').populate('tickets');

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
            console.log(error)
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
                .populate('tickets');

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
        const events = await EventModel.find().populate('organizer').populate('tickets');
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
    const { name, description, date, limit, location, organizer, tickets } = req.body;

    if (id) {
        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(
                id,
                { name, description, date, limit, location, organizer, tickets },
                { new: true, runValidators: true }
            ).populate('organizer').populate('tickets');

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
