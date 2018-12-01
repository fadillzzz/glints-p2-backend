class Restaurants {
    async test(req, res) {
        console.log(req.user);
        res.send(req.user);
    }
}

module.exports = Restaurants;
