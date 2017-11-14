const { Observable, map } = require("./../../index");

test("map should affect each item emitted", () => {
	const o = new Observable();
	const o1 = map(x => x + 1, o);
	const callback = jest.fn();
	o1.subscribe(callback);
	o1.next(1);
	o1.next(2);
	expect(callback).toBeCalled();
	expect(callback.mock.calls[0][0]).toBe(2);
	expect(callback.mock.calls[1][0]).toBe(3);
});

test("map should affect each item regardless of where it's emitted", () => {
	const o = new Observable();
	const o1 = map(x => x + 1, o);
	const callback = jest.fn();
	o1.subscribe(callback);
	// .next() a bunch of data
	o1.next(1);
	o1.next(2);
	o.next(1);
	o.next(2);
	// check it
	expect(callback).toBeCalled();
	expect(callback.mock.calls[0][0]).toBe(2);
	expect(callback.mock.calls[1][0]).toBe(3);
	expect(callback.mock.calls[2][0]).toBe(2);
	expect(callback.mock.calls[3][0]).toBe(3);
});

test("Observer should still allow unsubscription", () => {
	const o = new Observable();
	const o1 = map(x => x + 1, o);
	const callback = jest.fn();
	const subscription = o1.subscribe(callback);
	// call our callback once
	o.next(1);
	expect(callback).toBeCalled();
	subscription.unsubscribe();
	// this shouldn't reach our callback
	o.next(2);
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0]).toBe(2);
});