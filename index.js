const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const config = require('./api/config.json');
const {
    AuthController,
    RestaurantsController,
    CollectionsController,
    CollectionsRestaurantsController,
    CollectionsUsersController
} = require('./api/controllers');
const {SocketService} = require('./api/services');

SocketService.setIo(io).init();

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);
mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

app.use(bodyParser.json());
app.use(cors());

app.post('/auth', AuthController.create);

app.use(jwt({secret: config.secret}));
app.get('/restaurants', RestaurantsController.search);
app.get('/collections', CollectionsController.get);
app.post('/collections', CollectionsController.create);
app.get('/collections/:id', CollectionsController.show);
app.put('/collections/:id', CollectionsController.edit);
app.put('/collections/:id/restaurants/:restaurant', CollectionsRestaurantsController.addRestaurant);
app.delete('/collections/:id/restaurants/:restaurant', CollectionsRestaurantsController.removeRestaurant);
app.patch('/collections/:id/users', CollectionsUsersController.addUser);

server.listen(9000, () => console.log('Server started'));

