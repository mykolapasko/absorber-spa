'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgentSchema = new Schema({

	row: {
		type: Number,
		default: null
	},

	column: {
		type: Number,
		default: null
	},

	weight: {
		type: Number,
		default: null
	},

	deck: {
		 type: String,
		 default: null
	},

	isEmpty: {
		type: Boolean,
		default: true
	}

});

module.exports = mongoose.model('Agents', AgentSchema);