var request = require('request');
var oauth2;
var token;

function createAccessToken(callback){
  oauth2.client
    .getToken({})
    .then(function saveToken(result) {
      token = oauth2.accessToken.create(result);
      callback();
    })
    .catch(function logError(error) {
      console.log('Error creating access_token', error.message);
    });
}

function refreshAccessToken(callback){
  token.refresh().then(function saveToken(result) {
    token = result;
    callback();
  })
  .catch(function logError(error) {
    console.log('Error refreshing access_token', error.message);
  });
}

function performRequest(url, callback){
  request({
      auth: {
        bearer: token.access_token
      },
      method: 'GET',
      url: url
    }, function(err, res, body){
      if(err){
        callback(err, null);
      }else if(res.statusCode !== 200){
        callback('Server returned status: '+res.statusCode, null);
      }else{
        callback(null, body);
      }
  });
}

function prepareRequest(url, callback){
  if(!token){
    createAccessToken(function(){
      performRequest(url, callback);
    });
  }else if(token.expired()){
    refreshAccessToken(function(){
      performRequest(url, callback);
    });
  }else{
    performRequest(url, callback);
  }
}

var PyramusClient = function(options){
  this.appId = options.appId;
  this.appSecret = options.appSecret;
  this.pyramusUrl = options.pyramusUrl;
  oauth2 = require('simple-oauth2')({
      clientID: options.appId,
      clientSecret: options.appSecret,
      site: options.pyramusUrl+'/auth'
  });
}

PyramusClient.prototype.getMunicipalities = function(callback){
  prepareRequest(this.pyramusUrl+'/municipalities', callback);
}

PyramusClient.prototype.getNationalities = function(callback){
  prepareRequest(this.pyramusUrl+'/nationalities', callback);
}

PyramusClient.prototype.getLanguages = function(callback){
  prepareRequest(this.pyramusUrl+'/languages', callback);
}

module.exports = PyramusClient;