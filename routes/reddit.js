const express = require('express');
const mysql = require('mysql');
const fetch = require('node-fetch');
const router = express.Router();
const db = require('../src/db');
db.connect();

router.get('/', (req, res) => {
    let searchTerm = req.query.searchTerm;
    let time = req.query.time;

    let sql = `SELECT * FROM reddit WHERE searchTerm='${searchTerm}' AND time='${time}'`;

    outputR = [];
    
    let query = db.query(sql, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            outputR.push({
                title: row.title,
                link: row.link,
                urlExtern: row.urlExtern,
                score: row.score,
                thumbnail: row.thumbnail,
                text: row.text,
                subreddit: row.subreddit,
                numComments: row.numComments,
                image: row.image,
                redditId: row.redditId,
                searchTerm: row.searchTerm,
                time: row.time,
                
            });
            
        });
        res.render('reddit', {
                    reddit: 'Reddit',
                        outputRs: outputR,
                        searchTerm: searchTerm,
                        time:time
                    });
    })   
})
module.exports = router;