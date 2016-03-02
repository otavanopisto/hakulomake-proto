var request = require('request');
var EXPIRE_SLACK = 300;
var _this;

var PyramusClient = function(options){
  this.appId = options.appId;
  this.appSecret = options.appSecret;
  this.pyramusUrl = options.pyramusUrl;
  this.redirectURI = options.redirectURI;
  this.authCode = options.authCode;
  _this = this;
}

PyramusClient.prototype._createAccessToken = function(callback){
  request({
      rejectUnauthorized: false,
      method: 'POST',
      url: _this.pyramusUrl+'oauth/token',
      form: {
        grant_type: 'authorization_code',
        code: _this.authCode,
        redirect_uri: _this.redirectURI,
        client_id: _this.appId,
        client_secret: _this.appSecret
      }
    }, function(err, res, body){
      if(err){
        callback(err);
      }else if(res.statusCode !== 200){
        callback('Server returned status: '+res.statusCode);
      }else{
        _this.token = JSON.parse(body);
        setTimeout(function(){
          _this._refreshAccessToken(function(err){
            if(err){
              console.log('Error refreshing token: '+err);
            }
          });
        },(_this.token.expires_in - EXPIRE_SLACK) * 10);
        callback(null);
      }
  });
}

PyramusClient.prototype._refreshAccessToken = function(callback){
  request({
      rejectUnauthorized: false,
      method: 'POST',
      url: _this.pyramusUrl+'oauth/token',
      form: {
        grant_type: 'refresh_token',
        refresh_token: _this.token.refresh_token,
        redirect_uri: _this.redirectURI,
        client_id: _this.appId,
        client_secret: _this.appSecret
      }
    }, function(err, res, body){
      if(err){
        callback(err);
      }else if(res.statusCode !== 200){
        callback('Server returned status: '+res.statusCode);
      }else{
        _this.token = JSON.parse(body);
        setTimeout(function(){
          _this._refreshAccessToken(function(err){
            if(err){
              console.log('Error refreshing token: '+err);
            }
          });
        },(_this.token.expires_in - EXPIRE_SLACK) * 10);
        callback(null);
      }
  });
}

PyramusClient.prototype._performRequest = function(url, callback){
  request({
      auth: {
        bearer: _this.token.access_token
      },
      rejectUnauthorized: false,
      method: 'GET',
      url: url
    }, function(err, res, body){
      if(err){
        callback(err);
      }else if(res.statusCode !== 200){
        callback('Server returned status: '+res.statusCode);
      }else{
        callback(null, JSON.parse(body));
      }
  });
}

PyramusClient.prototype._prepareRequest = function(url, callback){
  if(!_this.token){
    _this._createAccessToken(function(err){
      if(err){
        callback(err);
      }else{
        _this._performRequest(url, callback);
      }
    });
  } else {
    _this._performRequest(url, callback);
  }
}

PyramusClient.prototype.getMunicipalities = function(callback){
  _this._prepareRequest(_this.pyramusUrl+'students/municipalities', callback);
}

PyramusClient.prototype.getNationalities = function(callback){
  _this._prepareRequest(_this.pyramusUrl+'students/nationalities', callback);
}

PyramusClient.prototype.getLanguages = function(callback){
  _this._prepareRequest(_this.pyramusUrl+'students/languages', callback);
}

module.exports = PyramusClient;