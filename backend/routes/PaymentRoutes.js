const PaymentRouter = require('express').Router();
const Stripe = require('stripe');


const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this is securely set

PaymentRouter.post('/checkout-session', async(req,res) => {
    try {
        const {name, price} = req.body;
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
                unit_amount: price*100, // Amount in cents ($20.00)
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
    
        res.json({ url: session.url,
            success : true
         });
      } catch (error) {
        console.error('Error creating checkout session:', error);
        res.json({ message: 'An error occurred while creating checkout session',
            success : false
         });
      }
})

PaymentRouter.get('/verify-session', async(req,res) => {
    const {sessionID} = req.query;
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

module.exports = PaymentRouter;