const express = require('express');
const mongoose = require('mongoose');
const T = require('../src/utils/twitter');
require('../models/Twitter');

// Map global promise = get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/crypto-portal', {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const Twitter = mongoose.model('twitter');

let twitSearch = T.search();
let twitOutput = [];
twitSearch.then(function (filteredArr) {

    for (i = 0; i < filteredArr.length; i++) {
        Twitter.deleteMany({
            id: filteredArr[i].id
        }, function (err, Twit) {
            if (err) {
                console.log(err);
            };
        });
    }

    new Twitter({

        })
        .save()
        .then(tweet => {
        });
    Twitter.insertMany(filteredArr, function (err, Twit) {
        if (err) {
            console.log(err);
        };
    });
});