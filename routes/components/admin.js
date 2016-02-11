var Application = require('../../model/application');
var _ = require('underscore');
var config = require('../../config');

exports.renderAdminView = function(req, res){
  var query = {};
  if(typeof(req.query.state) !== 'undefined' && req.query.state !== ''){
    query.state = req.query.state;
  }
  if(typeof(req.query.primary) !== 'undefined' && req.query.primary !== ''){
    query.primaryRequest = req.query.primary;
  }
  if(typeof(req.query.secondary) !== 'undefined' && req.query.secondary !== ''){
    query.secondaryRequest = req.query.secondary;
  }
  Application.find(query)
    .sort({ added: 1 })
    .exec(function(err, applications){
      if(err){
        res.status(404).send();
      }else{
        res.render('admin', {applications: applications, state: 'Hakemukset', positions: config.positions, query: query, root: config.server_root});
      }
    });
};