import { Observable } from "./observable";

/*
 * a specialization of an Observable that takes an event name (click, keyup, etc)
 * and an element, sets up a listener, and provides the event as the Observable .next() value
 */
export class EventObservable extends Observable {
  constructor(event, element) {
    super();
    // keep the event and element so we can remove the listener
    this.event = event;
    this.element = element;
    // re-bind the handler so we keep the right this
    this.handler = this.handler.bind(this);
    element.addEventListener(this.event, this.handler);
  }
  
  // seperate handler function that propagates events to .next()
  handler(ev) {
    this.next(ev);
  }
  
  // again, we go all out in the Observable unsubscribe - we remove the listener
  // the Observers don't care about this, they just stop listening when they
  // unsubscribe
  unsubscribe() {
    super.unsubscribe();
    this.element.removeEventListener(this.event, this.handler);
  }
}