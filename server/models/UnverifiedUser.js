const mongoose = require('mongoose');

const unverifiedUserSchema = mongoose.Schema({
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
}, { collection: 'unverified' });

module.exports = UnverifiedUser = mongoose.model('unverifiedUsers', unverifiedUserSchema);