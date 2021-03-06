module.exports = class Output {
	constructor(options) {
		for (let name in options) {
			this[name] = options[name];
		}
		
		if (this._enabled === undefined) this.enabled = true;
		if (this._silly === undefined) this.silly = false;
		if (this._types === undefined) this.types = { deny: [] };
	}

	get enabled() { return this._enabled; }
	set enabled(val) { this._enabled = val; }// boolean val
	get silly() { return this._silly; }
	set silly(val) { this._silly = val; }// boolean val
	get types() { return this._types; }
	set types(val) { this._types = val; }// object val

	canPrint(type) {
		if (!this._enabled) return;
		if (!this._silly && type === 'silly') return;
		if (this.isTypeDenied(type)) return;
		else if (this.isTypeDisallowed(type)) return;
		return true;
	}

	isTypeDenied(type) {
		return this._types.deny && this._types.deny.indexOf(type) >= 0;
	}

	isTypeDisallowed(type) {
		return this._types.allow && this._types.allow.indexOf(type) == -1;
	}

	allowAll() { this.types = { deny: [] } }

	denyAll() { this.types = { allow: [] } }

	allow(...types) {
		if (this._types.deny) this.denyAll();
		this.types.allow.push(...types);
	}

	deny(...types) {
		if (this._types.allow) this.allowAll();
		this.types.deny.push(...types);
	}
}