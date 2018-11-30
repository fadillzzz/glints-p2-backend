const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UsersController = new (require('./api/users.controller'))();

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(cors());

app.post('/users', UsersController.create);

app.listen(9000, () => console.log('Server started'));

