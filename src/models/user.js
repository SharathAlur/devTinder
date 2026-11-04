const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: email => validator.isEmail(email),
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        validate: (gender) => ['male', 'female'].includes(gender) 
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    photoUrl: {
        type: String,
        default: 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/'
    },
    skills: {
        type: [String]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)