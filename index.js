const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 3000;
app.use('/users', userRoutes)

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port  ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err.message));
