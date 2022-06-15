const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose')
const Message = require('./models/Message')
require('dotenv').config();


app.use(express.json());

// app.listen(proces)
const finalPort = process.env.NODE_ENV === "production" ? process.env.PORT : process.env.OUR_PORT;

const mongo_url = "mongodb+srv://Evans:Mongodb6@cluster0.ltwol.mongodb.net/mess_chat?retryWrites=true&w=majority"
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.once('open', () => console.log('Connecté à MongoLab'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html')
});

app.post('/message/add', async (req, res) => {
    const { text, from } = req.body;
    const newMessage = new Message({
        text, from: "Evans",
        to: "Lol", created_at: Date.now()
    })

    const saveMessage = await newMessage.save();

    res.send(saveMessage)
});

io.on('connection', (socket) => {
    console.log('le chat est en cours de dev');
    socket.on('chat message', (inputValue) => {
        console.log(inputValue)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});






server.listen(finalPort, (error) => {
    if (error) {
        return console.log('une erreur est survenue bg')
    }
    console.log('Hey ca marche');
})