import { Observer } from "./observer";

/*
 * base class that recives updated values through it's next() method
 * and dispatches them through it's notifyObservers() method
 * The Observable instance keeps a list of all subscribed Observers,
 * and attempts to notify them when a new value is provided. It's up
 * to each Observer to decide how to handle the message
 */
export class Observable {
  constructor() {
    this.observers = [];
    this.active = true;
  }
  
  // recives the next value and trys to notifyObservers
  next(value) {
    if (this.active) {
      this.notifyObservers(value);
    }
  }
  
  // simple loop through each observer and call it's .update() method
  notifyObservers(value) {
    for (let observer of this.observers) {
      observer.update(value);
    }
  }
  
  // instnatiates a new Observer with the provided function and adds it to the list
  // also returns the new instance so it can be retained and unsubscribed from
  // for more flexiblity this should also allow already instantiated Obsever instances
  // in addition to just functions
  subscribe(fn) {
    let newObserver = new Observer(fn);
    this.observers.push(newObserver);
    return newObserver;
  }
  
  // similar pattern with unsubscribe setting active true/false
  // but here it's a little more "permenant" since it removes the
  // references to the observers. If we wanted this to be a resumable
  // Observable we could move the nullification to a .destroy() method
  // and just de-activate notification here
  unsubscribe() {
    this.active = false;
    this.observers = null;
  }
}