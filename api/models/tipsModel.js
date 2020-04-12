'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipSchema = new Schema({

  id: {
    type: Number,
    default: null
  },

  diameter_one: {
    type: Number,
    default: null
  },

  diameter_two: {
    type: Number,
    default: null
  },

  diameter_avg: {
    type: Number,
    default: null
  },

  weight: {
    type: Number,
    default: null
  }
},

{
  timestamps: true
});

module.exports = mongoose.model('Tips', TipSchema);