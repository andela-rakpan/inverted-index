//Dependencies
var express = require('express');
var path = require('path');

var app = express();


//Routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/views/index.html');
});
app.use(express.static(path.join(__dirname, 'src')));

//Start server
app.listen(process.env.PORT, function(req, res){
    console.log('Listening on port' + process.env.PORT);
});