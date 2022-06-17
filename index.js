const express = require('express')
const http = require('http');
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose')
const Message = require('./models/Message')
const axios = require('axios')
require('dotenv').config();


app.use(cors());
app.use(express.json());


// app.listen(proces)
const finalPort = process.env.NODE_ENV === "production" ? process.env.PORT : process.env.OUR_PORT;

const mongo_url = "mongodb+srv://Evans:Mongodb6@cluster0.ltwol.mongodb.net/mess_chat?retryWrites=true&w=majority"
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.once('open', () => console.log('Connecté à MongoLab'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

io.on('connection', (socket) => {
    console.log('le chat est en cours de dev');
    socket.on('send message', (addRes) => {
        io.emit('new message has set', addRes);
    });
    // Ici on envis un msg en base de donnée

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});
// Ici on recupère les messages deja existant
app.use('/message', require('./routes/message.js'))




server.listen(finalPort, (error) => {
    if (error) {
        return console.log('une erreur est survenue bg')
    }
    console.log('Hey ca marche');
})