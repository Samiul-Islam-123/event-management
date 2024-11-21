const express = require('express');
const ConnectToDatabase = require('./Database/Connection')
const dotenv = require('dotenv');
const cors = require('cors');
const UserRouter = require('./routes/UserRoutes');
const EventRouter = require('./routes/EventRoutes');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json())

const PaymentRouter = require('./routes/PaymentRoutes');
const EmailRouter = require('./routes/EmailRoutes');
const TicketRoutes = require('./routes/TicketRoutes');
const sendEmail = require('./service/emailSender');
const FeedbackModel = require('./Database/Models/FeedbackModel');
const UserModel = require('./Database/Models/UserModel');
const PORT = process.env.PORT || 5500;

app.get('/', (req, res) => {
    res.json({
        message: "Server is running fine :)"
    })
})

app.post('/feedback', async (req, res) => {
    const { email, message } = req.body;

    try {
        const User = await UserModel.findOne({
            email: email
        })

        if (User) {
            const FeedbackData = new FeedbackModel({
                customer: User._id,
                message: "This is a sample message :)"
            })

            await FeedbackData.save();

            // Send an email to the owner
            const subject = 'New Feedback Received';
            const html = `
        <h2>New Feedback Alert</h2>
        <p>You have received new feedback on your platform.</p>
        <h3>Feedback Details</h3>
        <ul>
          <li><strong>From:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
          <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>Please check the admin dashboard for more details.</p>
      `;

            // Send the email
            await sendEmail('noobcoder76@gmail.com', subject, '', html);

            res.json({
                success: true,
                message: "Feedback recorded successfully"
            })

        }

        else {
            res.json({
                success: false,
                message: "User not found, may be you have'nt logged in :("
            })
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
})

app.use('/user', UserRouter);
app.use('/event', EventRouter);
app.use('/payment', PaymentRouter);
app.use('/email', EmailRouter);
app.use('/ticket', TicketRoutes)

app.listen(PORT, async () => {
    console.log("Server is starting ...");
    await ConnectToDatabase(process.env.DB_URL);
    console.log("Server is running on PORT : " + PORT)
})