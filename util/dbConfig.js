const mongoose = require('mongoose');



function connection() {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true,family:4});
    const db = mongoose.connection;
    db.once('open', function () {
        console.log(`${db.name} connected successfully`)
    })
    
}
module.exports = connection;