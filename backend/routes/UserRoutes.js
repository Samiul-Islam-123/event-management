const UserModel = require('../Database/Models/UserModel');

const UserRouter = require('express').Router();

UserRouter.post('/',async (req,res) => {

    const {username, email, clerkID} = req.body;
    if(username && email && clerkID){
        const CurrentUser = new UserModel({
            username : username,
            email : email,
            clerkID : clerkID
        })

        await CurrentUser.save();

        res.json({
            success : true,
            message :  "User Saved successfully"
        })
    }

    else
    return res.json({
        success : false,
        message : "Invalid input"
    })

})

module.exports = UserRouter;