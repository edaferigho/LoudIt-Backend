const mongoose = require('mongoose');



function connection() {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.once('open', function () {
        console.log(`${db.name} connected successfully`)
    })
    
}
module.exports = connection;