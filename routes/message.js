const express = require('express');
const router = express.Router();
const Message = require('../models/Message')


router.get('/all', async (req, res) => {
    const allMessages = await Message.find();
    return res.send(allMessages);
});
router.post('/add', async (req, res) => {
    const { text, from } = req.body;
    const newMessage = new Message({
        text, from: "Evans",
        to: "Lol", created_at: Date.now()
    })
    const saveMessage = await newMessage.save();
    res.send(saveMessage);
});



module.exports = router;