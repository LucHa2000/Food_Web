const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MedicalDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('connect done ! ');
    } catch (err) {
        console.log('Error');
    }
}
module.exports = { connect };