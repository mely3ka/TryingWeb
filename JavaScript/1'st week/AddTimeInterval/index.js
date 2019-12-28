/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var summins = hours*60+minutes;
    summins+=interval;
    var newhours = Math.floor(summins/60);
    var newminutes = summins - newhours*60;
    if(newhours>23){
        var normalizedhours = newhours - Math.floor(newhours/24)*24;
    } else {
        var normalizedhours = newhours;
    }
    if (normalizedhours<10){
        normalizedhours = '0'+normalizedhours;
    }
    if (newminutes<10){
        newminutes = '0'+newminutes;
    }
    return normalizedhours+':'+newminutes;
};
