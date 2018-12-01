const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const moment = require('moment');
const config = require('./api/config.json');
const Restaurant = require('./api/models/restaurant.model');

const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Parse each line from the backup CSV and save the data into the DB
 *
 * @param {String} restaurant
 */
function convert(restaurant) {
    const name = restaurant[0];
    const availability = restaurant[1].split('/');

    const restaurantData = {
        name,
        availability: []
    };

    availability.forEach(avail => {
        const days = avail.match(/[a-zA-Z, \-]+/)[0].split(', ').map(day => day.trim());
        const timeRange = avail.match(/\d.+/)[0].split('-').map(time => time.trim());
        const open = moment(timeRange[0], 'H:mm A');
        const close = moment(timeRange[1], 'H:mm A');
        // Check to see if they open till some time in the next day
        const overNight = open.hour() > close.hour();

        // Parse the day ranges
        let parsedDays = [];
        days.forEach(day => {
            if (day.indexOf('-') !== -1) {
                day = day.split('-').map(x => x.trim());

                parsedDays = parsedDays.concat(
                    availableDays.slice(availableDays.indexOf(day[0]), availableDays.indexOf(day[1]) + 1)
                );
            } else {
                parsedDays.push(day);
            }
        });

        // Convert each of the parsed day and add the timestamp of which the restaurant open and closes
        parsedDays.forEach(day => {
            let open = moment(`${day} ${timeRange[0]}`, 'ddd H:mm A');
            let close = moment(`${day} ${timeRange[1]}`, 'ddd H:mm A');

            if (overNight) {
                // Split the open time into two different days
                close = open.clone().endOf('day');

                restaurantData.availability.push({
                    day: open.day(),
                    open: open.diff(open.clone().startOf('day'), 'minutes'),
                    close: close.diff(close.clone().startOf('day'), 'minutes')
                });

                open.add(1, 'day').startOf('day');
                close = moment(`${day} ${timeRange[1]}`, 'ddd H:mm A');
                close.add(1, 'day');

                day = open.day();
                open = open.diff(open.clone().startOf('day'), 'minutes');
                close = close.diff(close.clone().startOf('day'), 'minutes') - 1;

                if (open !== close) {
                    restaurantData.availability.push({day, open, close});
                } else {
                    // lol get outta here, what are you doing
                }

            } else {
                restaurantData.availability.push({
                    day: open.day(),
                    open: open.diff(open.clone().startOf('day'), 'minutes'),
                    // Minus 1 because the time they close shouldn't count as being open
                    close: close.diff(close.clone().startOf('day'), 'minutes') - 1
                });
            }
        });
    });

    Restaurant.create(restaurantData);
}

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);
mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(-1);
});
mongoose.connection.on('connected', () => {
    const stream = fs.createReadStream('./data.csv');

    const csvStream = csv().on('data', data => {
        convert(data);
    }).on('end', () => {
        console.log('All done');
        process.exit(0);
    });

    stream.pipe(csvStream);
});
