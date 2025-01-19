const PaymentRouter = require('express').Router();
const Stripe = require('stripe');
const UserModel = require('../Database/Models/UserModel');


const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this is securely set

PaymentRouter.post('/checkout-session', async (req, res) => {
  try {
    const { name, price } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              // Replace with your image URL
            },
            unit_amount: price * 100, // Amount in cents ($20.00)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({
      url: session.url,
      success: true
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.json({
      message: 'An error occurred while creating checkout session',
      success: false
    });
  }
})

PaymentRouter.get('/verify-session', async (req, res) => {
  const { sessionID } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID);

    if (session) {
      return res.json({ success: true, session });
    } else {
      return res.json({ success: false, message: 'Session not found' });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    return res.json({ success: false, message: 'Error retrieving session' });
  }
})

// After the user completes the checkout session, Stripe will redirect them to your success URL
PaymentRouter.get('/success-split', async (req, res) => {
  const { sessionID } = req.query;

  console.log(sessionID)

  try {
    // Retrieve the session using the session_id
    const session = await stripe.checkout.sessions.retrieve(sessionID);

    // Retrieve the PaymentIntent associated with the session
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    // Check the status of the Payment Intent
    if (paymentIntent.status === 'succeeded') {
      // The payment was successful
      //console.log('Payment succeeded!');

      // Optionally, check the transfer data to verify the split (destination)
      // if (paymentIntent.transfer_data && paymentIntent.transfer_data.destination) {
      //   console.log('Payment was split to:', paymentIntent.transfer_data.destination);
      // }

      res.json({
        message: 'Payment successful and split done.',
        success: true
      });
    } else {
      // Payment failed or is still pending
      console.log('Payment failed or is pending.');
      res.json({
        message: 'Payment failed or pending.',
        success: false
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).send('Error verifying payment.');
  }
});


PaymentRouter.post('/checkout-session-split', async (req, res) => {
  const { ticketQuantity, organizerAccountId, unitAmount } = req.body;
  console.log(organizerAccountId)
  try {
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Adjust currency if needed
            product_data: {
              name: 'Event Ticket',
            },
            unit_amount: unitAmount * 100, // Amount in smallest currency unit (cents for USD)
          },
          quantity: ticketQuantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success-split?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      payment_intent_data: {
        transfer_data: {
          destination: organizerAccountId, // The organizer's Stripe account ID
        },
        application_fee_amount: Math.floor(unitAmount * 100 * 0.2), // 20% platform fee
      },
    });

    // Send the session URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error cmy reating checkout session', error);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

PaymentRouter.post('/create-stripe-account', async (req, res) => {
  const { organizer } = req.body;

  try {

    // Step 1: Check if the organizer exists
    let existingOrganizer = await UserModel.findOne({ _id: organizer });

    if (!existingOrganizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found"
      });
    }

    // Step 2: If the organizer doesn't have a Stripe ID, create a new Stripe account
    if (!existingOrganizer.stripe_id) {
      const [firstName, lastName] = existingOrganizer.username.split(" ");




      // Create a Stripe Express account for the organizer
      const account = await stripe.accounts.create({
        type: 'standard',//express
        email: existingOrganizer.email,
        country: 'FR',
        business_type: 'individual', // or 'company', depending on the organizer type
        individual: {
          first_name: firstName,
          last_name: lastName,
        }
      });

      existingOrganizer.stripe_id = account.id
      existingOrganizer.isOrganizer = true;

      await existingOrganizer.save();

      // Generate the account link for onboarding
      const accountLink = await stripe.accountLinks.create({
        account: account.id,  // Use the organizer's Stripe account ID
        refresh_url: process.env.CLIENT_URL + '/reauth',  // URL if they need to reauthorize
        return_url: process.env.CLIENT_URL + '/app/profile',  // URL after successful onboarding
        type: 'account_onboarding',  // This type is for onboarding the user
      });

      // Send the URL for the frontend to redirect the user to Stripe's hosted onboarding page
      return res.json({
        success: true,
        message: 'Redirecting to Stripe onboarding...',
        accountLinkUrl: accountLink.url  // Send the account link URL to the frontend
      });
    }
  }
  catch (error) {
    console.error('Error creating Stripe account:', error);
    res.json({
      success: false,
      message: 'Error creating Stripe account.',
      error: error.message
    });
  }


})

PaymentRouter.post('/get-stripe-dashboard-link/:organizer', async (req, res) => {
  const { organizer } = req.params;

  try {
    // Step 1: Check if the organizer exists
    const existingOrganizer = await UserModel.findOne({ _id: organizer });

    if (!existingOrganizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // Step 2: Check if the organizer has a Stripe ID
    if (!existingOrganizer.stripe_id) {
      return res.status(400).json({
        success: false,
        message: "Organizer does not have a Stripe account. Please onboard the organizer first.",
      });
    }

    // Step 3: Generate a login link for the Stripe Express Dashboard
    const loginLink = await stripe.accounts.createLoginLink(existingOrganizer.stripe_id);

    // Step 4: Send the login link to the frontend
    return res.json({
      success: true,
      message: "Stripe dashboard link generated successfully.",
      dashboardUrl: loginLink.url,
    });
  } catch (error) {
    console.error("Error generating Stripe dashboard link:", error);
    res.status(500).json({
      success: false,
      message: "Error generating Stripe dashboard link.",
      error: error.message,
    });
  }
});


async function generateLoginLink(accountId) {
  try {
    const loginLink = await stripe.accounts.createLoginLink(accountId);
    console.log('Login link:', loginLink.url);
    return loginLink.url;
  } catch (error) {
    console.error('Error generating login link:', error.message);
    throw error;
  }
}
PaymentRouter.get('/details/:clerkID', async (req, res) => {
  const { clerkID } = req.params;

  try {
    const user = await UserModel.findOne({
      clerkID : clerkID,

    })

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      })
    }

    const organizerStripeID = user.stripe_id;

    if(organizerStripeID){

      
      // Fetch account details
      const accountDetails = await stripe.accounts.retrieve(organizerStripeID);
      
      // Fetch account balance
      const balance = await stripe.balance.retrieve({
        stripeAccount: organizerStripeID,
      });
      
      // Fetch recent transactions
      const transactions = await stripe.balanceTransactions.list(
        { limit: 10 }, // Limit to the latest 10 transactions
        { stripeAccount: organizerStripeID }
      );
      
      // Fetch recent payouts
      const payouts = await stripe.payouts.list(
        { limit: 10 }, // Limit to the latest 10 payouts
        { stripeAccount: organizerStripeID }
      );
      
      // Organize the balance information (total available balance, pending, etc.)
      const availableBalance = balance.available.reduce((acc, item) => acc + item.amount, 0) / 100; // In EUR or other currency
      const pendingBalance = balance.pending.reduce((acc, item) => acc + item.amount, 0) / 100; // In EUR or other currency
      
      // Send the response with all the details
      res.json({
        success: true,
        message: 'Organizer Stripe account details retrieved successfully',
      data: {
        //accountDetails,
        balance: {
          available: availableBalance,
          pending: pendingBalance,
        },
        transactions: transactions.data,
        payouts: payouts.data,
      },
    });
  }

  else{
    res.json({
      success: false,
      message: 'Organizer Stripe account has not been created yet',
    })
  }
  } catch (error) {
    console.error('Error fetching organizer Stripe details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve organizer Stripe account details',
      error: error.message,
    });
  }
});

PaymentRouter.post('/withdraw/:organizerStripeID', async (req, res) => {
  const { organizerStripeID } = req.params;

  try {
    // Fetch account balance
    const balance = await stripe.balance.retrieve({
      // No parameters needed here
    }, {
      stripeAccount: organizerStripeID, // Specify the connected account using the Stripe-Account header
    });

    // Calculate total available amount
    const totalAvailable = balance.available.reduce((sum, item) => sum + item.amount, 0);

    if (totalAvailable <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds for withdrawal.',
      });
    }

    // Create a payout
    const payout = await stripe.payouts.create(
      {
        amount: totalAvailable, // Amount in cents
        currency: balance.available[0]?.currency || 'usd', // Default to USD
      },
      { stripeAccount: organizerStripeID } // Specify the connected account
    );

    // Respond with payout details
    res.json({
      success: true,
      message: 'Withdrawal initiated successfully.',
      data: {
        payout,
      },
    });
  } catch (error) {
    console.error('Error initiating withdrawal:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate withdrawal.',
      error: error.message,
    });
  }
});




module.exports = PaymentRouter;