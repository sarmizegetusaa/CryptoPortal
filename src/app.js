const path = require('path');
const express = require('express');
const hbs = require('hbs');
const coinmarketcap = require('./utils/side-bar');
const app = express();
// const db = require('./db');

// Load routes
const reddit = require('../routes/reddit');
const twitter = require('../routes/twitter');
const youtube = require('../routes/youtube');
const fun = require('../routes/fun');
const social = require('../routes/social-media');
const chart = require('../routes/chart');


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

// Create chart table
// app.get('/createchart', (req, res)=>{
//     let sql = 'CREATE TABLE chart(id int AUTO_INCREMENT, title VARCHAR(255), link VARCHAR(255), type VARCHAR(255), PRIMARY KEY(id) )';
//     db.query(sql, (err, result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('Chart table created...')
//     });
// })

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
app.use('/chart', chart);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});