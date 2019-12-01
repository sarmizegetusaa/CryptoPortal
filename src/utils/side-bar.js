const ccxt = require('ccxt');

let sidebar = {};
sidebar.coinData = function() {
    return new Promise(resolve => {
        let coinmarketcap = new ccxt.coinmarketcap();
        let results = coinmarketcap.fetchTickers();
        let output = [];

        results.then(result => {
            let cryptoPairs = ["BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BCH/USD"];
            let cryptoNames = ['img/coins/btc.svg', 'img/coins/eth.svg', 'img/coins/xrp.svg', 'img/coins/ltc.svg', 'img/coins/bch.svg']

            let priceUsdF;
            let priceUsdFixed;
            cryptoPairs.forEach(function (pair, idx) {
                priceUsdF = parseFloat(result[pair].info.price_usd);
                priceUsdFixed = priceUsdF.toFixed(2);
                output.push({
                    pair: cryptoNames[idx],
                    priceUsd: priceUsdFixed,
                    priceBtc: result[pair].info.price_btc,
                    change24h: result[pair].info.percent_change_24h,
                    change7d: result[pair].info.percent_change_7d,
                });
        
            });
            
            resolve(output);
        });
    
    });

}

module.exports = sidebar;