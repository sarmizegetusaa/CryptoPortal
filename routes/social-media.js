const express = require('express');
const router = express.Router();
const db = require('../src/db');

router.get('/', (req, res) => {    
    let allResults = [];
    let sqlTwit = `SELECT DISTINCT twitterId FROM twitter`;
    let sqlMemes = `SELECT DISTINCT image FROM memes`;
    let sqlYoutube = `SELECT * FROM youtube`;
    let sqlReddit = `SELECT * FROM reddit WHERE searchTerm='bitcoin' AND time='day'`;

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    let queryT = db.query(sqlTwit, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allResults.push({
                type: 'twitter',
                twitterId: row.twitterId,
            });
            
        });
    })

   
    let queryR = db.query(sqlReddit, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allResults.push({
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
    });
    
    let queryY = db.query(sqlYoutube, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            allResults.push({
                type: 'youtube',
                videoId: row.videoId,
                titleY: row.title,
                channel: row.channel,
                thumbnailY: row.thumbnail
            });
        });
    });


    setTimeout(()=>{
        let all = shuffle(allResults)
        res.render('social-media', {
            all: all,
            allString: JSON.stringify(all),
        })
    }, 1000)
});

module.exports = router;