const path = require('path');
// require('dotenv').config({path: path.join(_dirname, '../.env')});
const Account = require('./../app/models/Account');
const mongoose = require('mongoose');
const connectDB = require('./../config/db/index');

const accounts = [
    new Account({
        password: "nhan123",
        full_name: "Nhan Dang",
        email: "nhanreceiver248@gmail.com",
        phone_number: "0123456789",
        account_status: 1,
        accountType: 1,
        address: "Danang, Vietnam",
    })
]

connectDB.connect();

accounts.map(async (a, index) => {
    await a.save((err, result) => {
        if (index == accounts.length - 1) {
            console.log('DONE!')
            mongoose.disconnect();
        }
    });
})
