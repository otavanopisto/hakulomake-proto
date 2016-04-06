var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var config = require('./config');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var User = require('./model/user');


mongoose.connect('mongodb://' + config.database.host + '/' + config.database.table);
require('./auth/passport')(passport);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(expressSession({secret:config.session_secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('port', config.port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(expressValidator());

require('./routes')(app);

User.find({}, function(err, users){
  if(err){
    console.log(err);
  }else{
    if(users.length == 0){
      var newuser = new User();
      newuser.email = config.defaultUser.name,
      newuser.password = newuser.generateHash(config.defaultUser.pw);
      newuser.role = 'admin';
      newuser.save(function(err, user){
        if(err){
          console.log(err);
        }else{
          console.log('Created default user since none existed');
        }
      });
    }
  }
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});