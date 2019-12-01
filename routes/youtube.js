const express = require('express');
const db = require('../src/db');
const router = express.Router();

router.get('/', (req, res) => {
    let outputL = [];
    let sqlYoutube = `SELECT * FROM youtube`;
            
    let query = db.query(sqlYoutube, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            outputL.push({
                videoId: row.videoId,
                title: row.title,
                channel: row.channel,
                thumbnail: row.thumbnail
                
            });
            console.log('bla')
        });
        res.render('youtube', {
            youtube: 'youtube',
            outputLs: outputL
            })
    })   
})

module.exports = router;