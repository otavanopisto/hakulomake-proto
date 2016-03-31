var Comment = require('../../model/comment');

exports.create = function(req, res){
  var application = req.body.application;
  var text = req.body.text;
  var comment = new Comment();
  comment.application = application;
  comment.text = text;
  comment.user = req.user._id;
  comment.added = new Date();
  comment.save(function(err, comment){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(comment);
    }
  });
};