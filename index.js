const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const app = express();
const config = require('./api/config.json');
const {AuthController, RestaurantsController} = require('./api/controllers');

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);
mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(bodyParser.json());
app.use(cors());

app.post('/auth', AuthController.create);

app.use(jwt({secret: config.secret}));
app.get('/restaurants', RestaurantsController.test);

app.listen(9000, () => console.log('Server started'));

