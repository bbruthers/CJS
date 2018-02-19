var async = require('async');
var fs = require('fs');

module.exports.ReadTxtFileAsync = async function(localPath) {
    var finalResult;
    await async.parallel([
        function(callback){
            console.log('***ASYNC FUNCTION***');
            fs.readFile(__dirname + localPath, function(err, data){
                console.log('***fs READ FILE***');
                if (err){
                    console.log('***FILE READ ERR***')
                    //callback(err);
                    callback(err);
                }
                else {
                    callback(null, data);
                }
            });
        }
    ], function FinalCallback(finalerr, data){
        //final callback
        if (finalerr){
            console.log('finalerr' + finalerr);
            return finalerr;
        }
        else {
            finalResult =  data;
        }
    });

    return finalResult;
}