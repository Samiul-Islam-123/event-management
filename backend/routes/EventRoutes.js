const express = require('express');
const EventModel = require('../Database/Models/EventModel');
const upload = require('../config/multer');
const EventRouter = express.Router();
const cloudinary = require('../config/cloudinary');


// Create Event with Poster Image
EventRouter.post('/', upload.single('poster'), async (req, res) => {
    const { name, description, date, limit, location, organizer, attendees, price } = req.body;

    if (name && description && date && location && organizer) {
        try {
            let posterUrl = '';

            // Upload image to Cloudinary if poster is provided
            if (req.file) {
                console.log('file found')
                const result = await cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'event_posters',
                },async (error, result) => {
                    if (error) {
                        throw new Error('Failed to upload image');
                    }
                    //console.log(result)
                    posterUrl = result.secure_url;
                    // Create new event with poster URL
                    const newEvent = new EventModel({
                        name,
                        description,
                        date,
                        limit,
                        location,
                        organizer,
                        attendees,
                        poster: posterUrl,
                        price : price
                    });

                    await newEvent.save();
                    res.json({
                        success: true,
                        message: "Event created successfully",
                        event: newEvent
                    });
                }).end(req.file.buffer);
            }

            else{   
                return res.json({
                    success : false,
                    message : "Image is required"
                })
            }

            // // Create new event with poster URL
            // const newEvent = new EventModel({
            //     name,
            //     description,
            //     date,
            //     limit,
            //     location,
            //     organizer,
            //     attendees,
            //     poster: posterUrl
            // });

            // await newEvent.save();
            // res.json({
            //     success: true,
            //     message: "Event created successfully",
            //     event: newEvent
            // });
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
