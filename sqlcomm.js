//var sql = require('mssql');

var config = {
    user: 'rdssa',
    password: '$ch1_gs33',
    server: 'aa140drw2uvmfhk.ccpdpy4uztlz.us-east-1.rds.amazonaws.com',
    database: 'IversonGaming'
};

module.exports.GetTable = function(strQuery) {

    var sql = require('mssql');
    console.log("attempting to connect...");

    var error;
    var result = '';

    sql.connect(config, function(err) {

        console.log("sql.connect");
        if(err) {
            console.log('sql.Connect callback Err: ' + err);
            error = err;
        }
        
        var request = new sql.Request();

        //query db and get records
        request.query(strQuery, function QueryResult(requestErr, recordset) {
            if(requestErr) {
                console.log('request.query callback Err: ' + requestErr);
                error = requestErr;
            }
             
            result = recordset;
            console.log(result);
        });
    });

    if(error != undefined) {
        return error;
    }
    else {
        //sql.close();
        return result;
    }
}