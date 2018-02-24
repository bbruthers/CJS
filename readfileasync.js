var async = require('async');
var fs = require('fs');

module.exports.ReadTxtFileAsync = function(localPath, cb){
    async.waterfall([
        function(callback){
            fs.readFile(__dirname + localPath, 'utf8',function(err, data){
                if(err) {
                    console.log('***FILE READ ERR***');
                    callback(null, err);
                }
                else {
                    callback(null, data);    
                }
            });
        }
    ], cb);
}