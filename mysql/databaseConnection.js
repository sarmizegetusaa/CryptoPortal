// const mysql = require('mysql');
const fetch = require('node-fetch');
const db = require('../src/db');
// var sanitizeHtml = require('sanitize-html');
const getConnection = require('../src/utils/twitter');
const youtubeKey = require('../src/utils/youtube');
db.connect();

let title, link, image, score, text, subreddit, numComments, urlExtern, redditId;
function removeInvalidChars(str) {
    return str.replace(/([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g, '');
    //console.log(this)
}

// delete all data from chart
let sqlDeleteChart = 'DELETE FROM chart';
let queryChart = db.query(sqlDeleteChart, (err, result)=>{
    if(err) throw err;
    console.log(result)
})

let sqlChart = 'INSERT INTO chart SET ?';

let outputC = [];
let subreddits = ['bitcoin', 'cryptocurrency', 'ethereum', 'crypto', 'btc', 'cryptomarkets', 'investing', 'worldnews']

subreddits.forEach(subreddit => {
    setTimeout(()=>{     
        fetch(`http://www.reddit.com/r/${subreddit}.json?limit=50&sort=top`)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < 50; i++) {
                console.log(data.data.children[i].data.title)
                let newEntry = {
                    title: data.data.children[i].data.title,
                    link: removeInvalidChars(`https://www.reddit.com${data.data.children[i].data.permalink}`),
                    type: 'chart'
                };
                outputC.push(newEntry);
                let query = db.query(sqlChart, newEntry, (err, result)=>{
                    if(err) {
                        console.log(err);
                        // throw err;
                    }
                })
            }
        })
    }, 1000)
    }
)
// // delete all data from reddit
// let sqlDelete = 'DELETE FROM reddit';
// let query = db.query(sqlDelete, (err, result)=>{
//     if(err) throw err;
//     console.log(result)
// })

// // insert data into reddit
// let sql = 'INSERT INTO reddit SET ?';

// outputR = [];
// let searchTermArr = ['bitcoin', 'ethereum', 'crypto', 'blockchain'];
//  let timeArr = ['day', 'week', 'month', 'all'];

// searchTermArr.forEach((searchTerm)=>{
//     setTimeout(()=>{
//         timeArr.forEach((time)=>{
//             setTimeout(()=>{
//                 fetch(
//                 `http://www.reddit.com/search.json?q=${searchTerm}&t=${time}&limit=20&sort=top`
//                 ).then(res => res.json()).then(data => {
//                     //console.log(data)
//                     for (i = 0; i < 20; i++) {
//                         if (data.data.children[i].data.post_hint == 'image') {
//                             image = data.data.children[i].data.url
//                             thumbnail = data.data.children[i].data.url;
//                         } else {
//                             thumbnail = 'https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80'
//                         }
//                         //console.log(`https://www.reddit.com${data.data.children[i].data.permalink}`);
//                         let title = removeInvalidChars(data.data.children[i].data.title);
//                         console.log('title', title);
//                         let newEntry = {
//                             title: title,
//                             link: removeInvalidChars(`https://www.reddit.com${data.data.children[i].data.permalink}`),
//                             urlExtern: data.data.children[i].data.url,
//                             score: data.data.children[i].data.score,
//                             thumbnail: thumbnail,
//                             text: removeInvalidChars(data.data.children[i].data.selftext),
//                             subreddit: data.data.children[i].data.subreddit,
//                             numComments: data.data.children[i].data.num_comments,
//                             image: data.data.children[i].data.url,
//                             redditId: data.data.children[i].data.id,
//                             searchTerm: searchTerm,
//                             time: time,
//                             type: 'reddit'
//                         };
//                         outputR.push(newEntry);
//                         let query = db.query(sql, newEntry, (err, result)=>{
//                             if(err) {
//                                 console.log(err);
//                                 // throw err;
//                             }
//                         });
//                     }
//                 })
//                 .catch(err => console.log(err));
//             }, 3000);
//         })
//     }, 2000);
// });

// //delete all data from twitter
// let sqlDeleteTwit = 'DELETE FROM twitter'
// let queryTwit = db.query(sqlDeleteTwit, (err, result)=>{
//     if(err) throw err;
//     console.log(result)
// })

// //insert data into twitter
// let sqlTwit = 'INSERT INTO twitter SET ?';

// let twitObject = {};
// twitObject.search = function () {
//     return new Promise(function (resolve) {
//         let TwitConnection = getConnection();
//         let filteredArr = [];
//         let output = [];
//         searchTermArr.forEach((searchTerm)=>{
//             setTimeout(()=>{
//                 TwitConnection.get('search/tweets', {
//                     q: `${searchTerm}`,
//                     count: 1000,
//                     lang: 'en'
//                 }, function (err, data, response) {
//                     if (err !== undefined) {
//                         resolve([]);
//                     } else {                        
//                         let statuses = data.statuses;
//                         statuses.forEach(function (status) { 
//                             if (status.retweet_count > 15) {    
//                                 output.push({
//                                     id: status.retweeted_status.id_str,
//                                     searchTerm: searchTerm,
                                    
//                                 })        
//                                 //filter out the duplicates
//                                 const seen = new Set();
//                                 filteredArr = output.filter(el => {
//                                     const duplicate = seen.has(el.id);
//                                     seen.add(el.id);
//                                     return !duplicate;
//                                 })
//                             }    
//                         });
//                         resolve(filteredArr);
//                         for(i=0; i<filteredArr.length; i++){
//                             let newEntry = {
//                                 twitterId: filteredArr[i].id,
//                                 searchTerm: filteredArr[i].searchTerm,
//                                 type: 'twitter'
//                             }
//                             let query = db.query(sqlTwit, newEntry, (err, result)=>{
//                                     if(err) throw err;
//                                     });
//                         }
//                     }
//                 });
//             }, 2000)           
//     });
// })
// }
// let twitSearch = twitObject.search();

// //delete all data from youtube
// let sqlDeleteY = 'DELETE FROM youtube';
// let queryY = db.query(sqlDeleteY, (err, result)=>{
//     if(err) throw err;
//     console.log(result)
// })

// // insert data into youtube
//  let sqlYoutube = 'INSERT INTO youtube SET ?';

// let outputL = [];
// fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bitcoin
//     &type=video
//     &key=${youtubeKey}`)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             response.items.forEach((item, idx) => {

//                 outputL.push({
//                     id: item.id.videoId,
//                     title: removeInvalidChars(item.snippet.title),
//                     thumbnail: item.snippet.thumbnails.medium.url,
//                     channel: item.snippet.channelTitle,
//                     link: removeInvalidChars(`https://www.youtube.com/watch?v=${item.id.videoId}`)
//                 });
               
//             });
//             for(i=0; i<outputL.length; i++){
//                 let newEntry = {
//                     videoId: outputL[i].id,
//                     title: outputL[i].title,
//                     channel: outputL[i].channel,
//                     thumbnail: outputL[i].thumbnail,
//                     type: 'youtube'
//                 };
//                 let queryY = db.query(sqlYoutube, newEntry, (err, result)=>{
//                     if(err) throw err;
//                 });
//                 console.log(newEntry)
//             }   
//         })
//         .catch(function (err) {
//             console.log(err)
//         });


// //delete data from memes table

// //insert data into memes table
// let sqlMemes = 'INSERT INTO memes SET ?';
  
// let arrayMemes = [];
// let sorts = ['hot', 'controversial', 'new', 'top'];
// let searchTermArray = ['bitcoin', 'ethereum', 'cryptocurrency', 'blockchain'];
// searchTermArray.forEach((searchTerm)=>{
//     setTimeout(()=>{
//         timeArr.forEach((time)=>{
//             setTimeout(()=>{
//                 sorts.forEach((sort)=>{
//                     fetch(
//                         `http://www.reddit.com/search.json?q=${searchTerm}&t=${time}&limit=20&sort=${sort}`
//                             ).then(res => res.json()).then(data => {
//                                 for (i = 0; i < 20; i++) {
//                                     if (data.data.children[i].data.post_hint == 'image') {
//                                         //console.log('meme', `https://www.reddit.com${data.data.children[i].data.permalink}`);
//                                         let newEntry = ({
//                                             //title: data.data.children[i].data.title,
//                                             image: data.data.children[i].data.url,
//                                             link: `https://www.reddit.com${data.data.children[i].data.permalink}`,
//                                             createdDate: data.data.children[i].data.created_utc,
//                                             type: 'meme'
//                                         })
//                                         arrayMemes.push(newEntry);
//                                         let query = db.query(sqlMemes, newEntry, (err, result)=>{
//                                             if(err) throw err;
//                                         });
//                                     }
//                                 }                                        
//                             })
//                             .catch(err => console.log(err));
//                             }, 3000);
//                         })
//                     }, 2000);
//                 });                     
//     },2000)
                        