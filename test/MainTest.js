import test from 'ava';

var c;

test.serial(`Requiring StaticConsole`, t => {
	return Promise.resolve(require('../StaticConsole.js')).then(module => {
		c = module;
	});
});

test(`Testing for built-in StdRouter`, t => {
	t.truthy(c.routers.std);
	t.true(c.routers.std instanceof require('../router'), `c.routers.std must be inherited from Router`);
	t.is(String(c.routers.std.tasks), '[object Map]', `c.routers.std.tasks must be of type Map`);
});

test.todo(`Other tests to be done`);