'use strict';

var Prices = require('../index.js');

Prices.prototype.fetchList = function (callback) {
    this._apiCall("GET", "list", "v1", function (err, response) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, response.response.items);
    });
};

Prices.prototype.fetchPrices = function (callback) {
    this._apiCall("GET", "prices", "v1", function(err, response) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, response.response.items);
    });
};

Prices.prototype.fetchCurrencies = function (callback) {
    this._apiCall("GET", "currencies", "v1", function(err, response) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, response.response.currencies);
    });
};
