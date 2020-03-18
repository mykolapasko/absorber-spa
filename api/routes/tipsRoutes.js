'use strict';

module.exports = function(app) {
	var tips = require('../controllers/tipController');

	// tipActions Routes
	app.route('/tips')
		.get(tips.list_all_tips)
		.post(tips.create_a_tip);
};
