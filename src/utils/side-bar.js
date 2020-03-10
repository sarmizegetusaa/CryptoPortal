const ccxt = require('ccxt');

let sidebar = {};
sidebar.coinData = function() {
    return new Promise(resolve => {
        let binance = new ccxt.binance();
        let results = binance.fetchTickers();
        let output = [];

        results.then(result => {
            let cryptoPairs = ["BTC/USDT", "ETH/USDT", "XRP/USDT", "LTC/USDT", "BCH/USDT"];
            let cryptoNames = ['img/coins/btc.svg', 'img/coins/eth.svg', 'img/coins/xrp.svg', 'img/coins/ltc.svg', 'img/coins/bch.svg']

            let priceUsdF;
            let priceUsdFixed;
            cryptoPairs.forEach(function (pair, idx) {
                console.log(result[pair]);
                priceUsdF = parseFloat(result[pair].info.price_usd);
                priceUsdFixed = priceUsdF.toFixed(2);
                output.push({
                    pair: cryptoNames[idx],
                    priceUsd: result[pair].ask,
                    change24h: result[pair].percentage
                });
        
            });
            resolve(output);
        });
    
    });

}

module.exports = sidebar;