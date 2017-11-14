const { Observable, filter } = require("./../../index");

test("filter should limit emitted values", () => {
	const o = new Observable();
	const o1 = filter(x => x%2 === 0, o);
	const callback = jest.fn();
	o1.subscribe(callback);
	o.next(1);
	o.next(2);
	o.next(3);
	o.next(4);
	expect(callback).toBeCalled();
	expect(callback.mock.calls[0][0]).toBe(2);
	expect(callback.mock.calls[1][0]).toBe(4);
});

test("Observer should still allow unsubscription", () => {
	const o = new Observable();
	const o1 = filter(x => x%2 === 0, o);
	const callback = jest.fn();
	const subscription = o1.subscribe(callback);
	// call our callback once
	o.next(2);
	expect(callback).toBeCalled();
	subscription.unsubscribe();
	// this shouldn't reach our callback
	o.next(4);
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0]).toBe(2);
});