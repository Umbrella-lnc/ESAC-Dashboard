const mongoose = require('mongoose');

const verifiedUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accessLevel: {
        type: String,
        required: true
    }
}, { collection: 'verified' });

module.exports = VerifiedUser = mongoose.model('verifiedUsers', verifiedUserSchema);