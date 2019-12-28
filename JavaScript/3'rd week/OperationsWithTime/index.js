/**
 * @param {String} date
 * @returns {Object}
 */
function plusZero(x) {
    if (x < 10) {
        x = '0'+ x
    }
    return x
}
module.exports = function (date) {
    years = Number(date.match(/\d{4}/)[0]);
    months = Number(date.match(/-\d{2}/g)[0].slice(1));
    days = Number(date.match(/-\d{2}/g)[1].slice(1));
    hours = Number(date.match(/\d{2}:/g)[0].slice(0,-1));
    minutes = Number(date.match(/:\d{2}/g)[0].slice(1));
    

    var dateobj = new Date(years,months+1,days,hours,minutes);
    var object={
        fulldate: dateobj,

        add: function(num,type){
            if(num<0 || ['years','months','days','hours','minutes'].indexOf(type)==-1){
                throw new TypeError();
            }
            var currentyear = this.fulldate.getFullYear();
            var currentmonth = this.fulldate.getMonth();
            var currentdate = this.fulldate.getDate();
            var currenthours  =this.fulldate.getHours();
            var currentminutes = this.fulldate.getMinutes();
            
            switch(type){
                case 'years':
                    this.fulldate = new Date(currentyear+num,currentmonth,currentdate,currenthours,currentminutes);
                    break;
                case 'months':
                    this.fulldate = new Date(currentyear,currentmonth+num,currentdate,currenthours,currentminutes);
                    break;
                case 'days':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate+num,currenthours,currentminutes);
                    break;
                case 'hours':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate,currenthours+num,currentminutes);
                    break;
                case 'minutes':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate,currenthours,currentminutes+num);
                    break;
            }
            return this;
        },
        subtract: function(num,type){
            if(num<0 || ['years','months','days','hours','minutes'].indexOf(type)==-1){
                throw new TypeError();
            }
            var currentyear = this.fulldate.getFullYear();
            var currentmonth = this.fulldate.getMonth();
            var currentdate = this.fulldate.getDate();
            var currenthours  =this.fulldate.getHours();
            var currentminutes = this.fulldate.getMinutes();
            
            switch(type){
                case 'years':
                    this.fulldate = new Date(currentyear-num,currentmonth,currentdate,currenthours,currentminutes);
                    break;
                case 'months':
                    this.fulldate = new Date(currentyear,currentmonth-num,currentdate,currenthours,currentminutes);
                    break;
                case 'days':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate-num,currenthours,currentminutes);
                    break;
                case 'hours':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate,currenthours-num,currentminutes);
                    break;
                case 'minutes':
                    this.fulldate = new Date(currentyear,currentmonth,currentdate,currenthours,currentminutes-num);
                    break;
            }
            return this;
        },
        get value () {
            return this.fulldate.getFullYear() + '-' + plusZero(this.fulldate.getMonth()-1) + '-' + plusZero(this.fulldate.getDate()) + ' ' + plusZero(this.fulldate.getHours()) + ':' + plusZero(this.fulldate.getMinutes());
        }
    }
    return object;
};
