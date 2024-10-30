const UserModel = require('../Database/Models/UserModel');
const UserRouter = require('express').Router();

// Create User Route
UserRouter.post('/', async (req, res) => {
    const { username, email, clerkID } = req.body;

    if (username && email && clerkID) {
        const CurrentUser = new UserModel({
            username: username,
            email: email,
            clerkID: clerkID
        });

        await CurrentUser.save();

        res.json({
            success: true,
            message: "User Saved successfully"
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid input"
        });
    }
});

// Get User by ID Route
UserRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        const UserDetails = await UserModel.findOne({ _id: id });

        if (UserDetails) {
            res.json({
                success: true,
                user: UserDetails
            });
        } else {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
    } else {
        return res.json({
            success: false,
            message: "User id required"
        });
    }
});

// Get All Users Route
UserRouter.get('/', async (req, res) => {
    const User = await UserModel.find();
    res.json({
        success: true,
        users: User
    });
});

// Update User Route
UserRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, clerkID } = req.body;

    if (id && (username || email || clerkID)) {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { username, email, clerkID },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.json({
                success: true,
                message: "User updated successfully",
                user: updatedUser
            });
        } else {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
    } else {
        return res.json({
            success: false,
            message: "Invalid input or User ID required"
        });
    }
});

// Delete User Route
UserRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (deletedUser) {
            res.json({
                success: true,
                message: "User deleted successfully"
            });
        } else {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
    } else {
        return res.json({
            success: false,
            message: "User ID required"
        });
    }
});

module.exports = UserRouter;
