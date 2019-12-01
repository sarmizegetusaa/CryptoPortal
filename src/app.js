const path = require('path');
const express = require('express');
const hbs = require('hbs');
const coinmarketcap = require('./utils/side-bar');
const db = require('../src/db');
const app = express();
//db.connect();


// app.get('/creatememestable', (req, res)=>{
//     let sqlMeme = 'CREATE TABLE memes(id int AUTO_INCREMENT, link VARCHAR(255), image VARCHAR(255), createdDate VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id) )';
//     db.query(sqlMeme, (err, result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('memes table created...')
//     });
// })

// app.get('/createtwitter', (req, res)=>{
//     let sqlTwitter = 'CREATE TABLE twitter(id int AUTO_INCREMENT, twitterId VARCHAR(255), searchTerm VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id) )';
//     db.query(sqlTwitter, (err, result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('twitter table created...')
//     });
// })
// app.get('/createyoutube', (req, res)=>{
//     let sqlYoutube = 'CREATE TABLE youtube(id int AUTO_INCREMENT, videoId VARCHAR(255), title VARCHAR(255), channel VARCHAR(255), thumbnail VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id) )';
//     db.query(sqlYoutube, (err, result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('twitter table created...')
//     });
// })

// // Create reddit table
// app.get('/createreddittable', (req, res)=>{
//     let sql = 'CREATE TABLE reddit(id int AUTO_INCREMENT, title VARCHAR(255), link VARCHAR(255), urlExtern VARCHAR(255), score int, thumbnail VARCHAR(255), text TEXT(65535), subreddit VARCHAR(255), numComments int, image VARCHAR(255), searchTerm VARCHAR(255), time VARCHAR(255), redditId VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id) )';
//     db.query(sql, (err, result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('Reddit table created...')
//     });
// })

// Load routes
const reddit = require('../routes/reddit');
const twitter = require('../routes/twitter');
const youtube = require('../routes/youtube');
const fun = require('../routes/fun');
const social = require('../routes/social-media');

// Load Keys
const keys = require('../config/keys');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// ifEquals helper
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// index route
app.get('', (req, res) => {
    res.render('', {
        title: 'Crypto Portal',
    });
});

// social media page
// app.get('/social-media', (req, res) => {
//     res.render('social-media', {
//         title: 'Crypto Portal',
//     });
// });

app.get('/get-tickers', (req, res) => {
    let coinData = coinmarketcap.coinData();
    coinData.then(output => {
        res.render('../partials/headerCoins', {
            outputs: output
        });
    });
});

// Use routes
app.use('/reddit', reddit);
app.use('/twitter', twitter);
app.use('/youtube', youtube);
app.use('/fun', fun);
app.use('/social-media', social);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});