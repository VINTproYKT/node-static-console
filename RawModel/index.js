const Model = require('static-console/model');
const util = require('util');

module.exports = class RawModel extends Model {
	constructor(options) {
		super(options);

		if (this._colors === undefined) this.colors = false;
		if (this._inspectOptions === undefined) this.inspectOptions = { breakLength: Infinity };
	}

	get colors() { return this._colors; }
	set colors(val) { this._colors = val; }// boolean val
	get inspectOptions() { return this._inspectOptions; }
	set inspectOptions(val) { this._inspectOptions = val; }// object val

	convert(namespace, type, ...objects) {
		var data = [];
		if (namespace.length) data.push(this.formatNamespace(namespace));
		for (let obj of objects) {
			var entry;
			if (typeof obj == 'object' || typeof obj == 'array') {
				entry = util.inspect(obj, this.inspectOptions);
			}
			else entry = String(obj);
			if (obj instanceof Error) entry = (this.colors ? '\x1b[31m' : '') + entry + (this.colors ? '\x1b[0m' : '');
			data.push(entry);
		}
		this.namespace = namespace;
		this.type = type;
		var str = data.join(' ');
		this.data = str;
	}

	formatNamespace(namespace) {
		var firstANSI = namespace[0].ANSI || '';
		var lastANSI = '';
		var str = (this.colors ? firstANSI : '') +'[';
		for (let i = 0; i < namespace.length; i++) {
			if (namespace[i].ANSI) lastANSI = namespace[i].ANSI;
			if (i) str += (this.colors ? '\x1b[0m' : '') + (this.colors ? lastANSI : '') +' » ';
			str += namespace[i].displayTitle;
		}
		return str + (namespace[1] ? (this.colors ? '\x1b[0m' : '') + firstANSI : '') +']' + (this.colors ? '\x1b[0m' : '');
	}
}