const Stripe = require('stripe');


const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this is securely set


async function createAccountLink(organizerAccountId) {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: organizerAccountId,
            refresh_url: 'https://your-site.com/refresh',
            return_url: 'https://your-site.com/return',
            type: 'account_onboarding',
        });

        console.log('Account Link:', accountLink.url); // This is the URL you will redirect the organizer to
        return accountLink.url;
    } catch (error) {
        console.error('Error creating account link:', error);
    }
}
