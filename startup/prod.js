const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config();

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}