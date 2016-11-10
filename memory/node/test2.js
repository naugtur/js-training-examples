const printMem = require('./printMem')

var arr = [],
    tmpObj;

printMem()
    .then(() => {
        for (var i = 0; i < 100000; i++) {
            tmpObj = {};
            tmpObj['foooof'] = 2;
            arr.push(tmpObj);
            //delete is evil
            delete(tmpObj['foooof']);
        }
    })
    .then(printMem)
    .then(() => {
        // arr = null;
        tmpObj = null;
    })
    .then(printMem)
    .then(() => {
        //keep references in use!
        arr;
        tmpObj;
    })
