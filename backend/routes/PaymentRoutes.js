const PaymentRouter = require('express').Router();
const Stripe = require('stripe');


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
        application_fee_amount: Math.floor(unitAmount * 100 * 0.1), // 10% platform fee
      },
    });

    // Send the session URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session', error);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});


module.exports = PaymentRouter;