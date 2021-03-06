const Output = require('static-console/output');

module.exports = class StdOutput extends Output {
	constructor(options) {
		super(options);

		if (this._warn === undefined) this.warn = true;
	}

	get warn() { return this._warn; }
	set warn(val) {
		if (this._warn == val) return;
		if (val) process.on('warning', this.printWarning);
		else process.off('warning', this.printWarning);
		this._warn = val;
	}// boolean val

	print(model) {
		if (!this.canPrint(model.type)) return;
		if (model.type == 'error') process.stderr.write(model.data +'\n');
		else if (this._warn && model.type == 'warn') process.emitWarning(model.data +'\n');
		else process.stdout.write(model.data +'\n');
	}

	printWarning(warning) {
		process.stderr.write(warning +'\n');
	}
}