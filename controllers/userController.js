const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};
exports.createUser = async (req, res) => {
    const { name, email, mobile_no, password } = req.body;
    // console.log(req.body.name);
    try {
        const existUsername = await User.findOne({ email: email });
        if (existUsername) {
            res.status(403).json({ message: "user already exist" });
        } else {
            const newpassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, mobile_no, password: newpassword });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
exports.updateUser = async (req, res) => {
    try {
        const newpassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = newpassword
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.json({ message: "user not found" });
        } else {
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            res.json({ message: "user not found" });
        } else {
            res.json({ message: "user deleted successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const existUser = await User.findOne({ email: email });
        if (existUser) {
            const passwordMatch = await bcrypt.compare(password, existUser.password);
            if (passwordMatch) {
                const token = jwt.sign({ email: existUser.email }, 'your_secret_key');
                // Store token in session
                req.session.newtoken = token;

                res.status(200).json({ message: "user login successfully", _token: token, user: existUser });
            } else {
                res.status(404).json({ message: "Invalid username or password please check once" });
            }
        } else {
            res.status(200).json({ message: "Invalid username or password please check once" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
