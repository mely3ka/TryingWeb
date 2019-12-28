module.exports = {
    list: [],

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if(Object.keys(this.list).indexOf(event)==-1){
            this.list[event]=[];
        }
        this.list[event].push({
            sub: subscriber,
            handl: handler.bind(subscriber)
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if(Object.keys(this.list).indexOf(event)==-1){
            return this;
        }
        var t=[];
        for (var i=0; i<this.list[event].length;i++){
            if(this.list[event][i].sub==subscriber){
                t.push(i);
                // this.list[event].splice(i,1);
            }
        }
        for (var i=0;i<t.length;i++){
            this.list[event].splice(t[i]-i,1);
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if(Object.keys(this.list).indexOf(event)==-1){
            return this;
        }
        for (var i=0;i<this.list[event].length;i++){
            this.list[event][i].handl();
        }
        return this;
    }
};
