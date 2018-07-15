'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const urlSchema = new mongoose.Schema({
    _id: Number,
    url: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

urlSchema.plugin(autoIncrement.plugin, {
    model: 'URL',
    field: '_id',
    startAt: 100,
});

const URL = mongoose.model('URL', urlSchema);

// all CRUD operations here

module.exports.getEntryId = function(searchId, callback) {
    URL.findById(searchId, callback);
};

module.exports.findEntry = function(urlToSearch, callback) {
    URL.findOne({
        url: urlToSearch,
    }, callback);
};

module.exports.addEntry = function(url, callback) {
    let newUrl = new URL(url);
    newUrl.save(callback);
};
