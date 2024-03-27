const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};
exports.createCustomer = async (req, res) => {
    const { name, email, mobile_no, password, address } = req.body;
    // console.log(req.body.name);
    try {
        const existUsername = await Customer.findOne({ email: email });
        if (existUsername) {
            res.status(403).json({ message: "customer already exist" });
        } else {
            const newpassword = await bcrypt.hash(password, 10);
            const newUser = new Customer({ name, email, mobile_no, password: newpassword, address });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
exports.updateCustomer = async (req, res) => {
    try {

        if (req.body.password) {
            const newpassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = newpassword
        }

        const updatedUser = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.json({ message: "customer not found" });
        } else {
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const deleteduser = await Customer.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            res.json({ message: "customer not found" });
        } else {
            res.json({ message: "customer deleted successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {

        const existUser = await Customer.findOne({ email: email });
        if (existUser) {
            const passwordMatch = await bcrypt.compare(password, existUser.password);
            if (passwordMatch) {
                const token = jwt.sign({ email: existUser.email }, 'your_secret_key');
                // Store token in session
                req.session.customertoken = token;

                res.status(200).json({ message: "customer login successfully", _token: token, user: existUser });
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


