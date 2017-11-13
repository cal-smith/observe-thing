const { Observable, Observer } = require("./index");

test("the subscription should return an instance of Observer", () => {
	const o = new Observable();
	const subscription = o.subscribe(() => {});
	expect(subscription instanceof Observer).toBe(true);
});

test("The Observable should call the Observer with the next value", () => {
	const o = new Observable();
	const callback = jest.fn();
	o.subscribe(callback)
	o.next(1);
	expect(callback).toBeCalled();
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0]).toBe(1);
});

test("The Observer should stop emitting when unsubscribed", () => {
	const o = new Observable();
	const callback = jest.fn();
	// subscribe
	const subscription = o.subscribe(callback);
	// call our callback once
	o.next(1);
	expect(callback).toBeCalled();
	// unsubscribe
	subscription.unsubscribe();
	// this shouldn't reach our callback
	o.next(2);
	expect(callback.mock.calls.length).toBe(1);
	expect(callback.mock.calls[0][0]).toBe(1);
});