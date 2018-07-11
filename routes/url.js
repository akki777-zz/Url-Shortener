'use strict';

const express = require('express');
const router = new express.Router();
const encode = require('btoa');
const decode = require('atob');
const urlModel = require('../models/url');

router.get('/:shortUrl', (req, res) => {
    const searchId = decode(req.params.shortUrl);
    urlModel.getEntryId(searchId, (err, doc) => {
        if (err) console.error.bind(console);
        if (doc) {
            res.redirect(doc.url);
        } else {
            res.send('Entry not found.');
        }
    });
});

router.post('/shorten', (req, res) => {
    const fullUrl = req.body.url;

    urlModel.findEntry(fullUrl, (err, doc) => {
        if (err) console.error(err);
        if (doc) {
            const response = {
                url: fullUrl,
                shortCode: encode(doc._id),
                status: 200,
                msg: 'Entry exists',
            };
            res.send(response);
        } else {
            let addEntryPromise = addEntry(fullUrl);
            addEntryPromise.then((savedUrl) => {
                const response = {
                    url: savedUrl.url,
                    shortCode: encode(savedUrl._id),
                    status: 200,
                    msg: 'New entry',
                };
                res.send(response);
            });
        }
    });
});

/**
 * Adds new entry to URL collection.
 * @param {String} fullUrl
 * @return {Promise}
 */
function addEntry(fullUrl) {
    let entry = {
        'url': fullUrl,
    };

    return new Promise((resolve, reject) => {
        urlModel.addEntry(entry, (err, savedUrl) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(savedUrl);
            }
        });
    });
}

module.exports = router;
