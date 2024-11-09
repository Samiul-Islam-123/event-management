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
const PORT = process.env.PORT || 5500;

app.get('/', (req,res) => {
    res.json({
        message : "Server is running fine :)"
    })
})

app.use('/user', UserRouter);
app.use('/event', EventRouter);
app.use('/payment', PaymentRouter);
app.use('/email', EmailRouter);
app.use('/ticket', TicketRoutes)

app.listen(PORT,async () => {
    console.log("Server is starting ...");
    await ConnectToDatabase(process.env.DB_URL);
    console.log("Server is running on PORT : "+PORT)
})