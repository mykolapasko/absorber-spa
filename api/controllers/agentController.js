'use strict';

var mongoose = require('mongoose'),
	Agent = mongoose.model('Agents');

exports.list_all_agents = function(req, res) {
	Agent.find({}, function(err, agent) {
		if (err)
			res.send(err);
		res.json(agent);
	});
};

exports.update_an_agent = function(req, res) {
	Agent.findOneAndUpdate({_id:req.params.agentId}, req.body, {new:true}, function(err, agent) {
		if (err)
			res.send(err);
		res.json(agent);
	});
};