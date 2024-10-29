const mongoose = require('mongoose');

const ConnectToDatabase = async(url) => {
    try{
        console.log("Connecting to Database...");
        await mongoose.connect(url);
        console.log("Connected to Database successfully ...")
    }
    catch(error){
        throw error
    }
}

module.exports = ConnectToDatabase;