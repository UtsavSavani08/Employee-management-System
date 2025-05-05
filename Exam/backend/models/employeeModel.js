const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    employeeType: {
        type: String,
        required: [true, 'Please add employee type'],
        enum: ['Full-time', 'Part-time', 'Contract']
    },
    profilePic: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);