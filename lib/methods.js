'use strict';

var Prices = require('../index.js');

Prices.prototype.getList = function (callback) {
    this._retry(Prices.prototype.fetchList.bind(this), callback);
};

Prices.prototype.getPrices = function(callback) {
    this._retry(Prices.prototype.fetchPrices.bind(this), callback);
};

Prices.prototype.getCurrencies = function (callback) {
    this._retry(Prices.prototype.fetchCurrencies.bind(this), callback);
};

Prices.prototype._retry = function(method, callback) {
    var self = this;
    method(function(err, response) {
        if (err && (err.hasOwnProperty('statusCode') || err.message == 'Too Many Requests')) {
            setTimeout(Prices.prototype._retry.bind(self, method, callback), err.retryAfter || self.retryTime);
        } else {
            callback(err, response);
        }
    });
};