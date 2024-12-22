// stripeMiddleware.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const UserModel = require('../Database/Models/UserModel'); // Import your User model

const createStripeAccountMiddleware = async (req, res, next) => {
    const { organizer } = req.body;

    try {
        // Check if the organizer exists
        let existingOrganizer = await UserModel.findOne({ _id: organizer });

        if (!existingOrganizer) {
            return res.json({
                success: false,
                message: "Organizer not found"
            });
        }

        // If the organizer doesn't have a Stripe ID, create a new Stripe account
        if (!existingOrganizer.stripe_id) {
            const [firstName, lastName] = existingOrganizer.username.split(" ");

            

            return res.json({
                success : false,
                message : "Stripe account not created"
            })
        }

        // If the organizer already has a Stripe ID, move to the next step (event creation)
        next();

    } catch (error) {
        console.error('Error in Stripe account creation middleware:', error);
        res.json({
            success: false,
            message: 'Error creating Stripe account.',
            error: error.message
        });
    }
};

module.exports = createStripeAccountMiddleware;
