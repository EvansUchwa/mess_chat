const express = require('express')
const router = express.Router();
const path = require('path');
const isConnected = require('../middlewares/connect')
let root = path.join(__dirname, '../')


router.get('/', isConnected, function(req, res) {
    res.sendFile(root + '/public/index.html')
})

module.exports = router