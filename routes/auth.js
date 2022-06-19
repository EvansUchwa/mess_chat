const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path')
require('dotenv').config();
const User = require('../models/User')
let root = path.join(__dirname, '../')



router.get('/register', function(req, res) {
    res.sendFile(root + '/public/register.html')
})


router.get('/login', function(req, res) {
    if (req.session.connect && req.session.connect.connected === true) {
        res.redirect('/')
    } else {
        res.sendFile(root + '/public/login.html')
    }

})


router.post('/register', async function(req, res) {
    var { username, password } = req.body

    var alreadyUser = await User.find({ username: username })

    if (alreadyUser.length === 0) {
        var hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

        const user = new User({
            username: username,
            password: hash,
        })

        await user.save()

        req.session.connect = { success: true, connected: true, user: user }

        res.status(200).json(req.session.connect)
    } else {
        res.status(500).json({ success: false, message: 'Username already asigned.Try another!' })
    }


})


router.post('/login', async function(req, res) {
    var { username, password } = req.body

    var user = await User.find({ username: username })

    if (user.length === 1) {

        user = user[0]

        if (await bcrypt.compare(password, user.password)) {
            req.session.connect = { success: true, connected: true, user: user }
            res.status(200).json(req.session.connect)

        } else {
            req.session.connect = { connected: false }
            res.status(500).json({ success: false, message: 'Informations does not match' })
        }

    } else {
        req.session.connect = { connected: false }
        res.status(500).json({ success: false, message: 'Informations does not match' })
    }
})



module.exports = router