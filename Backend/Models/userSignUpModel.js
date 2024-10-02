const mongoose = require('mongoose');

// User signup schema with timestamps
const userSignUpSchema = new mongoose.Schema({
    uploadPic: {
        type: String, // Assuming it's a URL or file path
        default: '' // Default value if no picture is uploaded
    },
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensures password is at least 6 characters long
    },
    role: {
        type: String,
        enum: ['general', 'admin'], // Restricts role to 'user' or 'admin'
        default: 'general' // Default role is 'user'
    }
}, { timestamps: true }); // Add timestamps option

module.exports = mongoose.model('User', userSignUpSchema);
