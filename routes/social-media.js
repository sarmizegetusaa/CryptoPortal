const express = require('express');
const router = express.Router();
const db = require('../src/db');

router.get('/', (req, res) => {    
    
    let allT = [];
    let allR = [];
    let allY = [];
    let sqlTwit = `SELECT DISTINCT twitterId FROM twitter LIMIT 15`;
    let sqlMemes = `SELECT DISTINCT image FROM memes`;
    let sqlYoutube = `SELECT * FROM youtube LIMIT 21`;
    let sqlReddit = `SELECT * FROM reddit WHERE searchTerm='bitcoin' AND time='day'`;

    let queryT = db.query(sqlTwit, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allT.push({
                type: 'twitter',
                twitterId: row.twitterId,
            });
            
        });
    })

   
    let queryR = db.query(sqlReddit, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allR.push({
                type: 'reddit',
                titleR: row.title,
                linkR: row.link,
                urlExtern: row.urlExtern,
                score: row.score,
                thumbnailR: row.thumbnail,
                text: row.text,
                subreddit: row.subreddit,
                numComments: row.numComments,
                imageR: row.image,
                redditId: row.redditId,
                searchTerm: row.searchTerm,
                time: row.time
            });
        });
    })
    
    let queryY = db.query(sqlYoutube, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allY.push({
                type: 'youtube',
                videoId: row.videoId,
                titleY: row.title,
                channel: row.channel,
                thumbnailY: row.thumbnail
            });
        });
    })


    setTimeout(()=>{
        res.render('social-media', {
            allR: allR,
            allT: allT,
            allY: allY
        })
    }, 1000)
});

module.exports = router;