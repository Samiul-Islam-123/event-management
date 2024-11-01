const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    limit : {
        type : Number,
        required : true,
        default : 25
    },
    location: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    attendees: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }],
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const EventModel = mongoose.model("event", EventSchema);

module.exports = EventModel;
