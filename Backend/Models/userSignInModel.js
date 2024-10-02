const mongoose = require('mongoose');

// User sign-in schema
const userSignInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Converts email to lowercase
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email validation
    },
    password: {
        type: String,
        required: true
    },
    role:String
});

module.exports = mongoose.model('SignIn', userSignInSchema);
