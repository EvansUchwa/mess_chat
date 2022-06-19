const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dbConnect = require('./startup/db_connect')
const prod = require('./startup/prod')
require('dotenv').config();

//production of app
prod(app)


//connection to db
dbConnect()


// routes
app.use('/message', require('./routes/message.js'))
app.use('', require('./routes/home.js'))
app.use('', require('./routes/auth.js'))


//socket connection
io.on('connection', (socket) => {
    console.log('Chat en cours de dev');
    socket.on('send message', (addRes) => {
        io.emit('new message has set', addRes);
    });
    socket.on('disconnect', () => {
        console.log('Utilisateur deconnecté');
    });
});


const finalPort = process.env.NODE_ENV === "production" ? process.env.PORT : process.env.OUR_PORT;

server.listen(finalPort, (error) => {
    if (error) {
        return console.log('Une erreur est survenue')
    }
    console.log("Programme en cours d'exécution");
})