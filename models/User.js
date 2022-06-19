const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: 'simple_user'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('User', userSchema);