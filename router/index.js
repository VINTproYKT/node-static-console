const Output = require('static-console/output');

module.exports = class Router extends Output {
	constructor(options) {
		super(options);
		
		if (this._tasks === undefined) this.tasks = new Map();
	}

	get tasks() { return this._tasks; }
	set tasks(val) { this._tasks = val; }// Map tasks
}