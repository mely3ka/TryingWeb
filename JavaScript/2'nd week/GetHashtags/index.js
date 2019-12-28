/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var newstr = tweet.split(' ');
    var hashtags =[];
    for (var i=0;i<newstr.length;i++){
        if (newstr[i].startsWith('#')){
            hashtags.push((newstr[i].slice(1)));
        }
    }
    return hashtags;
};
