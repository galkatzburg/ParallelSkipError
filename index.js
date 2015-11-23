'use strict';

var async = require('async');

var utils = module.exports = {
    run: function(functions, callback) {
        var newFunctions = {};
        for (var func in functions) {
            newFunctions[func] = utils.skipError(functions[func]);
        }
        return async.parallel(newFunctions, callback);
    },
    skipError: function(func) {
        return function(callback) {
            func(function(err, value) {
                if (err) {
                    return callback(null, { err: err });
                }
                return callback(null, value);
            });
        }
    }
};
