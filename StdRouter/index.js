const Router = require('static-console/router');

module.exports = class StdRouter extends Router {
	constructor(options) {
		super(options);
	}

	send(namespace, type, ...obj) {
		if (!this.canPrint(type)) return;
		for (let [output, model] of this.tasks.entries()) this.makeTask(output, model, namespace, type, ...obj);
	}

	makeTask(output, model, namespace, type, ...obj) {
		model.convert(namespace, type, ...obj);
		output.print(model);
	}
}