const User = require('./models/User')
const Message = require('./models/Message')
const mongoose = require('mongoose');


const mongo_url = "mongodb+srv://Evans:Mongodb6@cluster0.ltwol.mongodb.net/mess_chat?retryWrites=true&w=majority"
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.once('open', () => console.log('Connecté à MongoLab'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

User.collection.drop().then(() => { console.log('Bien vidé'); }).catch(() => { console.log('Une erreur sest produite') })


//<>