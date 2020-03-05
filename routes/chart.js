const express = require('express');
const db = require('../src/db');
const router = express.Router();
const d3 = require('d3');

router.get('/', (req, res)=>{
    
    let chart = [];
    let sqlChart = `SELECT * FROM chart`;

    let searchTerms = [
      {
        searchTerm: 'ltc',
        occurrence : 0
      },
      {
        searchTerm: 'litecoin',
        occurrence : 0
      },
      {
        searchTerm: 'eos',
        occurrence : 0
      },
      {
        searchTerm: 'vechain',
        occurrence : 0
      },
      {
        searchTerm: 'ada',
        occurrence : 0
      },
      {
        searchTerm: 'cardano',
        occurrence : 0
      },
      {
        searchTerm: 'bnb',
        occurrence : 0
      },
      {
        searchTerm: 'neo',
        occurrence : 0
      },
      {
        searchTerm: 'bitcoin',
        occurrence : 0
      },
      {
        searchTerm: 'ethereum',
        occurrence : 0
      },
      {
        searchTerm: 'monero',
        occurrence : 0
      },
      {
        searchTerm: 'dash',
        occurrence : 0
      },
      {
        searchTerm: 'tron',
        occurrence : 0
      },
      {
        searchTerm: 'stellar',
        occurrence : 0
      },
      {
        searchTerm: 'tezos',
        occurrence : 0
      },
      {
        searchTerm: 'ripple',
        occurrence : 0
      },
      {
        searchTerm: 'chainlink',
        occurrence : 0
      },
      {
        searchTerm: 'cosmos',
        occurrence : 0
      },
      {
        searchTerm: 'iota',
        occurrence : 0
      },
      {
        searchTerm: 'zcash',
        occurrence : 0
      },
      {
        searchTerm: 'nem',
        occurrence : 0
      },
      {
        searchTerm: 'ontology',
        occurrence : 0
      },
      {
        searchTerm: 'augur',
        occurrence : 0
      },
      {
        searchTerm: 'holochain',
        occurrence : 0
      },
      {
        searchTerm: 'omisego',
        occurrence : 0
      },
      {
        searchTerm: 'nano',
        occurrence : 0
      },
      {
        searchTerm: 'lisk',
        occurrence : 0
      },
      {
        searchTerm: 'steem',
        occurrence : 0
      },
      {
        searchTerm: 'enjin',
        occurrence : 0
      },
      {
        searchTerm: 'siacoin',
        occurrence : 0
      },
      {
        searchTerm: 'verge',
        occurrence : 0
      },
      {
        searchTerm: 'huobi',
        occurrence : 0
      },
      {
        searchTerm: 'maker',
        occurrence : 0
      },
      {
        searchTerm: 'crypto.com',
        occurrence : 0
      },
      {
        searchTerm: 'dogecoin',
        occurrence : 0
      },
      {
        searchTerm: 'paxos',
        occurrence : 0
      },
      {
        searchTerm: 'decred',
        occurrence : 0
      },
      {
        searchTerm: 'synthetix',
        occurrence : 0
      },
      {
        searchTerm: 'molecular future',
        occurrence : 0
      },
      {
        searchTerm: '0x',
        occurrence : 0
      },
      {
        searchTerm: 'ravencoin',
        occurrence : 0
      },
      {
        searchTerm: 'algorand',
        occurrence : 0
      },
      {
        searchTerm: 'swipe',
        occurrence : 0
      },
    ];
    
    let query = db.query(sqlChart, (err, rows)=>{
        if(err) throw err;
        rows.forEach(function(row) {
            chart.push(
                row.title,
                // link: row.link,         
            );
        });

        chart.forEach(words => {
          searchTerms.forEach(term => {
            // console.log(term.searchTerm)
            if(words.toLowerCase().includes(term.searchTerm)) {
              term.occurrence++
            }
          })
        })
        
        res.render('chart', {
            chart: 'chart',
            charts: chart
        })
    })
})

module.exports = router;