'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ElementSchema = new Schema({

  stamp: {
    type: Number,
    default: null
  },

  banch: {
    type: Number,
    default: null
  },

  serial: {
    type: Number,
    default: null
  },

  pipe: {
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

  diameter_three: {
    type: Number,
    default: null
  },

  diameter_four: {
    type: Number,
    default: null
  },

  diameter_avg: {
    type: Number,
    default: null
  },

  abs_weight_calc: {
    type: Number,
    default: null
  },

  element_length: {
    type: Number,
    default: null
  },

  element_weight: {
    type: Number,
    default: null
  },

  absorber_hight: {
    type: Number,
    default: null
  },

  absorber_weight: {
    type: Number,
    default: null
  },

  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed', 'checked']
    }],
    default: ['pending']
  },

  actual_absorber_density: {
    type: Number,
    default: null
  },

  nozzle: {
    type: Number,
    default: null
  },

  nozzle_avg: {
    type: Number,
    default: null
  },

  stamp_avg: {
    type: Number,
    default: null
  },

  container: {
    type: Number,
    default: null
  }
},

{
  timestamps: true
});

module.exports = mongoose.model('Elements', ElementSchema);