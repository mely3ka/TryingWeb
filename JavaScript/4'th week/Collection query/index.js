/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function Deepcopy(collection){
    var copy=[];
    for(var i=0;i<collection.length;i++){
        var tempobj = {};
        for (j=0;j<Object.keys(collection[i]).length;j++){
            tempobj[Object.keys(collection[i])[j]] = collection[i][Object.keys(collection[i])[j]];
        }
        copy.push(tempobj);
    }
    return copy;
}

function query (collection) {
    var copy = Deepcopy(collection);
    var operations=[];
    for (var i=1; i<arguments.length;i++){
        operations.push(arguments[i]);
    }
    operations.sort(function(a,b){return (a.toString().split(' ')[1]).localeCompare(b.toString().split(' ')[1]);});
    for (var i=0; i<operations.length; i++){
        copy = operations[i](copy);
    }
    return copy;
}

/**
 * @params {String[]}
 */
function select () {
    var fields = [].slice.call(arguments);
    return function select (collection){
        // var collection = Deepcopy(collection);
        var res=[];
        for (var i=0;i<collection.length;i++){
            var tempobj={};
            for (var j=0; j<Object.keys(collection[i]).length;j++){
                if(fields.indexOf(Object.keys(collection[i])[j])!=-1){
                    tempobj[Object.keys(collection[i])[j]]=collection[i][Object.keys(collection[i])[j]];
                }
            }
            if(Object.keys(tempobj).length>0){
                res.push(tempobj);
            }
        }
        return res;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn (property, values) {
    var key = property;
    var namelist = values;
    return function filterIn (collection){
        // var collection = Deepcopy(collection);
        var res=[];
        for (var i=0; i<collection.length;i++){
            var tempobj={};
            if(collection[i].hasOwnProperty(key)){
                if(namelist.indexOf(collection[i][key])!=-1){
                    for (j=0;j<Object.keys(collection[i]).length;j++){
                        tempobj[Object.keys(collection[i])[j]] = collection[i][Object.keys(collection[i])[j]];
                    }
                }
            }
            else{
                continue;
            }
            if(Object.keys(tempobj).length>0){
                res.push(tempobj);
            }
        }
        return res;
    }
}


module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
