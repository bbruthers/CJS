var async = require('async');
var fs = require('fs');

module.exports.ReadTxtFileAsync = function(localPath) {
    var fileContents;
    async.parallel([
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
                    fileContents = data;
                    callback(null, fileContents);
                }
            });
        }
    ], function FinalCallback(finalerr){
        //final callback
        if (finalerr){
            console.log('finalerr' + finalerr);
            return finalerr;
        }
        else {
            return fileContents;
        }
    });
}

/**
 * module.exports.ReadTxtFileAsync = async function(localPath) {
    var fileContents;
    await async.parallel([
        function(callback){
            console.log('***ASYNC FUNCTION***');
            fs.readFile(__dirname + localPath, function(err, data){
                console.log('***fs READ FILE***');
                if (err){
                    console.log('***FILE READ ERR***')
                    callback(err);
                }
                else {
                    fileContents = data;
                    callback();
                }
            });
        }
    ], function FinalCallback(finalerr){
        //final callback
        if (finalerr){
            console.log('finalerr' + finalerr);
            return finalerr;
        }
        else {
            return fileContents;
        }
    });
}
 * 
 * 
 */