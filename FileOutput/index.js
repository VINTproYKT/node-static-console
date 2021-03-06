const Output = require('static-console/output');
const os = require('os');

module.exports = class FileOutput extends Output {
	constructor(options) {
		super(options);

		if (this._stream === undefined) this.stream = null;
		if (this._EOL === undefined) this.EOL = os.EOL;
	}

	get stream() { return this._stream; }
	set stream(val) { this._stream = val; }// stream.Writable val
	get EOL() { return this._EOL; }
	set EOL(val) { this._EOL = val; }// string val

	print(model) {
		if (!this.enabled) return;
		if (!this.stream) return;
		this._stream.write(model.data + this._EOL);
	}
}