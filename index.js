const util = require('util');

exports.log = function() {
	var arr = [];
	for (var i in arguments) {
		switch (typeof arguments[i]) {
			case 'number':
			case 'string':
				arr.push(arguments[i]);
				break;
			default:
				arr.push(util.inspect(arguments[i]));
		}
	}
	console.log(arr.join(' '));
}