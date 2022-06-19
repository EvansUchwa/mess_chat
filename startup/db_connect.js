const mongoose = require('mongoose')

module.exports = function() {

    const mongo_url = "mongodb+srv://Evans:Mongodb6@cluster0.ltwol.mongodb.net/mess_chat?retryWrites=true&w=majority"
    mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

    var db = mongoose.connection;
    db.once('open', () => console.log('Connecté à MongoLab'))
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}