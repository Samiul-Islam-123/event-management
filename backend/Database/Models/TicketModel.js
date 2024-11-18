const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "event"
    },
    status : {
        type : String
    },
    count : {
        type : Number
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

const TicketModel = new mongoose.model('ticket', TicketSchema);
module.exports = TicketModel;