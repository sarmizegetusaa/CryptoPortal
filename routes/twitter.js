const express = require('express');
const router = express.Router();
const db = require('../src/db');

router.get('/', (req, res) => {    
    let outputT = []
    let searchTerm = req.query.searchTerm;

    let sqlTwit = `SELECT DISTINCT twitterId FROM twitter WHERE searchTerm='${searchTerm}'`;

    let query = db.query(sqlTwit, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            outputT.push({
                twitterId: row.twitterId,
                searchTerm: row.searchTerm
            });
            
        });
        res.render('twitter', {
            tweets: outputT,
            searchTerm
        });
    })
          
});

module.exports = router;