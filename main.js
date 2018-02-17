//github remote push test

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var portNum = 2142;

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
//app.use(express.static(path.join(__dirname + '/public', 'public')));
//app.use('public', express.static('fescripts'));
app.use('/public', express.static('public'));

app.use(function(req, res, next) {
    console.log(Date() + ' /' + req.baseUrl);
    next();
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send();
});

/*** Routes ***/
app.get('/', function(request, response) {
    response.render('index');
});

app.get('/imgviewer', function(request, response) {
    response.render('imgviewer');
});

app.get('/dbp', function(request, reponse) {
    var dbTest = require('./sqlpromise');
    
    var tableResultPromise = dbTest.GetDBValuePromise("Select TOP 10 MACID, Credit, SessionGUID FROM [LBJ_Machine] WHERE Credit > '0.00' ");
    
    tableResultPromise.then(function ResolvedPromise(fromResolve) {

        var monetaryConvert = require('./Conver');
        fromResolve = monetaryConvert.ConvertCurrency(fromResolve); //convert credits in all array eleemnts if needed
        //reponse.render('dbfun', {tableresult: JSON.stringify(fromResolve)});
        reponse.render('dbfun', {tableresult: fromResolve});

    }).catch(function RejectedPromise(fromRejected) {
        console.log("TableResultPromise fromRejectged: " + fromRejected);
    });
});

app.get('/dbpjs', function(request, response) {
    var dbTest = require('./sqlpromise');
    
    var tableResultPromise = dbTest.GetDBValuePromise("Select TOP 10 MACID, Credit, SessionGUID FROM [LBJ_Machine] WHERE Credit > '0.00' ");
    
    tableResultPromise.then(function ResolvedPromise(fromResolve) {

        var monetaryConvert = require('./Conver');
        fromResolve = monetaryConvert.ConvertCurrency(fromResolve); //convert credits in all array eleemnts if needed
        //reponse.render('dbfun', {tableresult: JSON.stringify(fromResolve)});
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(fromResolve));
        response.end();

    }).catch(function RejectedPromise(fromRejected) {
        console.log("TableResultPromise fromRejected: " + fromRejected);
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(fromRejected));
        response.end();
    });
});

app.get('/map', function(request, response) {
    response.render('map');
});

//broken
app.get('/async', function(request, response) {
    var asyncfunc = require('./readfileasync');
    var testResult = asyncfunc.ReadTxtFileAsync('/txt/async1txt.txt');
    
    console.log('RESULT: ' + testResult);
    
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(testResult));
    response.end();
});

/** Listener **/
app.listen(portNum, function() {
    console.log('server started on port ' + portNum);
});