import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import ConnectRoute from 'connect-route';

import {Links} from '../imports/collections/links';

Meteor.startup(() => {
	Meteor.publish('links', function() {
		return Links.find({});
	});
});

function onRoute(req, res, next) {
	// Take token out of url and find matching link from Link collection
	const link = Links.findOne({token: req.params.token});
	
	// Redirect user to long url if link is found
	if (link) {
		Links.update(link, {$inc: {clicks: 1}});
		res.writeHead(307, {'Location': link.url});
		res.end();
	} else {
		// Send user to react app if no link is found
		next();
	}
	
}

const middleware = ConnectRoute(function(router) {
	router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
