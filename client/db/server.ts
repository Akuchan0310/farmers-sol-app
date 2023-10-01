const mongoose = require('mongoose');
require('dotenv');

const connectDB = async () => {
    if (mongoose.connections[0].readyState )
        return;
    mongoose.connect(process.env.MONGO_URI)
    .then((res: any) => {
        console.log('Connected to mongodb');
    })
    .catch((err: any) => {
        throw(err);
        console.log('Error connecting to db');
    });
}

module.exports = { connectDB };