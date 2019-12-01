const express = require('express');
const db = require('../src/db');
const router = express.Router();

router.get('/', (req, res)=>{
    
    let arrayMemes = [];
    let sqlMemes = `SELECT DISTINCT image FROM memes`;
            
    let query = db.query(sqlMemes, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            arrayMemes.push({
                image: row.image,
                link: row.link,
                createdDate: row.createdDate,
                
            });
        });
        res.render('fun', {
            fun: 'fun',
            arrayMemes: arrayMemes
        })
    })
})

module.exports = router;