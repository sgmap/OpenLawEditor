Template.swagger.created = function() {
	HTTP.get(this.data.resourceDeclaration, function(error, result) {
		if (error)	// TODO: handle errors
			throw error;

		Session.set('resourceDeclaration', result.data);
	});

	this.autorun(function() {
		var resourceDeclaration = Session.get('resourceDeclaration');

		if (! resourceDeclaration)
			return;

		try {
			check(resourceDeclaration);
		} catch(err) {
			console.error(err, 'We will still render. Please report any layout issues you get.');
		}
	});
}


Template.swagger.helpers({
	resourceDeclaration: function() {
		return Session.get('resourceDeclaration');
	},
	info: function() {
		if (Session.get('resourceDeclaration'))
			return Session.get('resourceDeclaration').info;
	},
	paths: function() {
		if (Session.get('resourceDeclaration'))
			return makePathsIterable(Session.get('resourceDeclaration').paths);
	}
});
