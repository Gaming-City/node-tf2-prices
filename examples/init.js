var TF2Prices = require('../index.js');
var fs = require('fs');

var options = {
    apiKey: ''
};

var prices = new TF2Prices(options);

if (fs.existsSync('prices.json')) {
    // Add the cached prices.
    prices.setPrices(JSON.parse(fs.readFileSync('prices.json')));
}

prices.init(function (err) {
    if (err) {
        console.log(err);
        return;
    }

    // Get price of a single item
    console.log(prices.getPrice('The Team Captain'));
});

// Event for staying up to date with the prices.
prices.on('price', function (state, item, price) {
    switch (state) {
        case 1:
            console.log(item.name + " has been added to the pricelist");
            break;
        case 2:
            console.log(item.name + " price has changed");
            break;
        case 3:
            console.log(item.name + " is no longer in the pricelist");
            break;
    }
});

// Event for when the prices has been requested / updated, use this to cache the prices.
prices.on('prices', function (prices) {
    fs.writeFileSync('prices.json', JSON.stringify(prices));
});

// Event for when the currencies has been requested / updated.
prices.on('currencies', function (currencies) {
    console.log("Currencies refreshed");
});