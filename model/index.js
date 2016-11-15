module.exports = class Model {
	constructor(options) {
		for (let name in options) {
			this[name] = options[name];
		}
	}
}