const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const {AuthController} = require('./api/controllers');

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(bodyParser.json());
app.use(cors());

app.post('/auth', AuthController.create);

app.listen(9000, () => console.log('Server started'));

