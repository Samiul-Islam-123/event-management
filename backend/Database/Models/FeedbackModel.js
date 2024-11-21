const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Ensure 'User' matches the name of your User model
        required: true, // Add required if this field must always have a value
    },
    message: {
        type: String,
        required: true, // Add required if the message is mandatory
        trim: true, // Removes leading/trailing spaces
    },
    timeStamp: {
        type: Date,
        default: Date.now, // Default to current date and time
    },
});

// Create the model
const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;
