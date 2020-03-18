'use strict';

var mongoose = require('mongoose'),
  Tip = mongoose.model('Tips');

exports.list_all_tips = function(req, res) {
  Tip.find({}, function(err, tip) {
    if (err)
      res.send(err);
    res.json(tip);
  });
};


exports.create_a_tip = function(req, res) {
  var new_tip = new Tip(req.body);
  new_tip.save(function(err, tip) {
    if (err)
      res.send(err);
    res.json(tip);
  });
};