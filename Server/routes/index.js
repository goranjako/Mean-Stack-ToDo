var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/users");


router.post('/register', function(req, res) {
  if (!req.body.fullName || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return  res.status(401).send({success: false, msg: 'Invalid Email!'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign( user.toJSON(),config.secret); 
          // return the information including token as JSON
          res.json({success: true, msg:'Successful login', token: token});

          //res.json({token: `Bearer ${token}`});
        } else {
          res.status(401).send({success: false, });
        }
      });
    }
  });
});


module.exports = router;

