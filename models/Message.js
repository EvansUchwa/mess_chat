const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: String,
    from: String,
    to: String,
    created_at: Date
})


module.exports = mongoose.model('Message', messageSchema);