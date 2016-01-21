var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var port     = process.env.PORT || 8080;

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.render('index.html');
});

http.listen(port);
console.log("App listening on port " + port);
