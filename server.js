//Dependencies
var express = require('express');

var app = express();


//Routes
app.get('/', function(req, res){
    res.send('I am working pretty fine');
});

//Start server
app.listen(3000, function(req, res){
    console.log('Listening on port 3000...');
});