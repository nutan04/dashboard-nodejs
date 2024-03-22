const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}