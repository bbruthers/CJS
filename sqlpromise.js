const sql = require('mssql');

var config = {
    user: 'rdssa',
    password: '$ch1_gs33',
    server: 'aa140drw2uvmfhk.ccpdpy4uztlz.us-east-1.rds.amazonaws.com',
    database: 'IversonGaming'
};

var pool1;

//not currently used
module.exports.GetDBValue = function(strQuery) {
    pool1 = new sql.ConnectionPool(config, error => {

        if(error) {
            console.log('Connection pool error' + error);
        }
        else {

            pool1.request().query(strQuery, (err, result) => {
            
                if(err) {
                    console.log('Error: ' + err);
                }
                else {
                    console.log(result);
                }
            });
        }
    });

    pool1.on('error', err => {
        console.log('connection pool event error: ' + err);
    });
}

module.exports.GetDBValuePromise = function(strQuery) {
    return new Promise(function PromiseResult(resolve, reject) {

        pool1 = new sql.ConnectionPool(config, error => {

            if(error) {
                console.log('Connection pool error' + error);
                reject(error);
            }
            else {
    
                pool1.request().query(strQuery, (err, result) => {
                
                    if(err) {
                        console.log('Error: ' + err);
                        reject(err);
                    }
                    else {
                        console.log(result.recordset);
                        resolve(result.recordset);
                    }
                });
            }
        });
    
        pool1.on('error', err => {
            console.log('connection pool event error: ' + err);
        });
    });
}