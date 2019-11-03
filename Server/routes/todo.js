var express = require('express');
var router = express.Router();
var passport = require('passport');
var Todo = require('../models/todo');
var User = require('../models/users');

 /* PostTodo*/
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var newTodo = new Todo({
      id: req.body.id,
      item: req.body.item,
     isCompleted: req.body.isCompleted
    });
    newTodo.save(function(err) {
      if (err) {
        console.log(newTodo);
        return res.json({success: false, msg: 'Save Todo failed.'});
      }
      res.json({success: true, msg: 'Successful Created new Item.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
 /* GetTodo*/
 router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Todo.find({id:req.params.id}, function (err, todo) {
      if (err) return next(err);
      res.json(todo);
    });  
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
 /* UpdateTodo*/
 router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
      if (err) return next(err);
      res.json({success: true, msg: 'Successful Update Item'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
  
  /* DeleteTodo */
  router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
      Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
        if (err) return next(err);
        res.json({success: true, msg: 'Successful Delete Item'});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });
 
    
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;