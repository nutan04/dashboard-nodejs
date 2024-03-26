const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const customerRoutes = require('./routes/customerRoutes')


const session = require('express-session');


const app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)



mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port  ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err.message));
