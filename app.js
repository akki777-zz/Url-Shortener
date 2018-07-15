'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const urlService = require('./routes/url');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 7001;

mongoose.connect('mongodb://127.0.0.1:27017/short_url', ({
    useNewUrlParser: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console));
dbConnection.once('open', console.log.bind(console, 'Connected'));

app.use(express.static('public'));

app.use('/', urlService);

app.listen(PORT, console.log.bind(console, `Listening on ${PORT}`));
