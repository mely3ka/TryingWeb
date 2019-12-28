/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var uniquehashtags ={};
    for (var i=0;i<hashtags.length;i++){
        var tag = hashtags[i].toLowerCase();
        if (uniquehashtags.hasOwnProperty(tag)){
             uniquehashtags[tag]++;
        }else{
             uniquehashtags[tag] = 1;
        }
        
    }




    return Object.keys(uniquehashtags).join(', ');
};
