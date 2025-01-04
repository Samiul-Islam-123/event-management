const express = require('express');
const EventModel = require('../Database/Models/EventModel');
const upload = require('../config/multer');
const EventRouter = express.Router();
const cloudinary = require('../config/cloudinary');
const UserModel = require('../Database/Models/UserModel');
const createStripeAccountMiddleware = require('../middlewares/stripemiddleware');

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

EventRouter.post('/poster', upload.single('poster'), async (req, res) => {
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
                url: posterUrl
            });
        }).end(req.file.buffer);
    } else {
        return res.json({
            success: false,
            message: "Image is required"
        });
    }
})

EventRouter.put('/poster', upload.single('poster'), async (req, res) => {
    const { oldImageUrl } = req.body;

    if (!oldImageUrl) {
        return res.json({
            success: false,
            message: "Old image URL is required",
        });
    }

    if (!req.file) {
        return res.json({
            success: false,
            message: "New image is required",
        });
    }

    try {
        // Extract the public_id from the old image URL
        const publicId = oldImageUrl.split('/').slice(-1)[0].split('.')[0];
        
        // Delete the old image from Cloudinary
        await cloudinary.uploader.destroy(`event_posters/${publicId}`, (error, result) => {
            if (error) {
                throw new Error('Failed to delete the old image');
            }
        });

        // Upload the new image
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: 'event_posters',
            },
            async (error, result) => {
                if (error) {
                    throw new Error('Failed to upload the new image');
                }

                // Get the secure URL of the new image
                const newPosterUrl = result.secure_url;

                res.json({
                    success: true,
                    message: "Image replaced successfully",
                    url: newPosterUrl,
                });
            }
        ).end(req.file.buffer);
    } catch (error) {
        res.json({
            success: false,
            message: "Error replacing the image",
            error: error.message,
        });
    }
});



// Create Event with Poster Image
EventRouter.post('/', createStripeAccountMiddleware, async (req, res) => {
    const { name, description, date, limit, location, organizer, tickets, price, posterURL, startTime, endTime } = req.body;

    try {
        // Check if the organizer exists in the UserModel
        let existingOrganizer = await UserModel.findOne({ _id: organizer });

        if (!existingOrganizer) {
            return res.json({
                success: false,
                message: "Organizer not found"
            });
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
            price,
            startTime, 
            endTime
        });

        await newEvent.save();

        // Respond with success and event details
        res.json({
            success: true,
            message: "Event created successfully",
            event: newEvent
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error creating event",
            error: error.message
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
EventRouter.put('/:id', upload.single('poster'), async (req, res) => {
    const { id } = req.params;
    const { oldImageUrl, name, description, date, limit, location, organizer, tickets } = req.body;

    if (!id) {
        return res.json({
            success: false,
            message: "Event ID is required",
        });
    }

    try {
        let newPosterUrl = oldImageUrl; // Default to old URL if no new image is uploaded

        // If a new poster is uploaded
        if (req.file) {
            if (!oldImageUrl) {
                return res.json({
                    success: false,
                    message: "Old image URL is required to replace the poster",
                });
            }

            // Extract the public_id from the old image URL
            const publicId = oldImageUrl.split('/').slice(-1)[0].split('.')[0];

            // Delete the old image from Cloudinary
            await cloudinary.uploader.destroy(`event_posters/${publicId}`, (error, result) => {
                if (error) {
                    throw new Error('Failed to delete the old image');
                }
            });

            // Upload the new image
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'event_posters' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            newPosterUrl = uploadResult.secure_url;
        }

        // Update the event in the database
        const updatedEvent = await EventModel.findByIdAndUpdate(
            id,
            { name, description, date, limit, location, organizer, tickets, poster: newPosterUrl },
            { new: true, runValidators: true }
        ).populate('organizer').populate('tickets');

        if (updatedEvent) {
            res.json({
                success: true,
                message: "Event updated successfully",
                event: updatedEvent,
            });
        } else {
            res.json({
                success: false,
                message: "Event not found",
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Error updating event",
            error: error.message,
        });
    }
});


// Delete Event by ID
EventRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const deletedEvent = await EventModel.findById(id);

            if(deletedEvent && deletedEvent.tickets.length ===0){
                await EventModel.findByIdAndRemove(id);
                res.json({
                    success: true,
                    message: "Event deleted successfully"
                });
            }

             else {
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
