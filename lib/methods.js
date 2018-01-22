'use strict';

var Prices = require('../index.js');

Prices.prototype.getList = function (callback) {
    this._retry(Prices.prototype._fetchList.bind(this), callback);
};

Prices.prototype.getPrices = function(callback) {
    this._retry(Prices.prototype._fetchPrices.bind(this), callback);
};

Prices.prototype.getCurrencies = function (callback) {
    this._retry(Prices.prototype._fetchCurrencies.bind(this), callback);
};

Prices.prototype.addItems = function(items, callback) {
    this._retry(Prices.prototype._pushItems.bind(this, items), callback);
};

Prices.prototype.removeItems = function(items, callback) {
    this._retry(Prices.prototype._removeItems.bind(this, items), callback);
};

Prices.prototype._retry = function(method, callback) {
    var self = this;
    method(function(err, response) {
        if (err && validReasonToRetry(err)) {
            setTimeout(Prices.prototype._retry.bind(self, method, callback), err.retryAfter || self.retryTime);
        } else if (callback) {
            callback(err, response);
        }
    });
};

function validReasonToRetry(err) {
    if (err.hasOwnProperty('code') && (err.code == 429 || err.code > 499)) {
        return true;
    }
    return false;
}