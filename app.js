'use strict';

const express = require('express');
const mongoose = require('mongoose');
const urlService = require('./routes/url');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 7001;

mongoose.connect('mongodb://127.0.0.1:27017/short_url', ({
    useNewUrlParser: true,
}));
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console));
dbConnection.once('open', console.log.bind(console, 'Connected'));

app.get('/', (req, res) => {
    res.send('Welcome to URL Shortner');
});

app.use('/', urlService);
app.listen(PORT, console.log.bind(console, `Listening on ${PORT}`));
