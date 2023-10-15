const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv');

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

module.exports = { connectDB };