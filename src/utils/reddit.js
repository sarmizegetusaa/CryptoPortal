const fetch = require('node-fetch');

const topRedditBitcoin = async function searchRedditBitcoin() {
    let resultsTop = fetch(
        `http://www.reddit.com/search.json?q=${searchTerm}&t=day&limit=10`
    );
    let results = await resultsTop;
    return results;
}

module.exports = topRedditBitcoin;