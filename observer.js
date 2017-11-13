/*
 * this handles calling the subscribed callbacks with updated values
 * and unsubscribing from updates
 * Observers are instantiated and maintained by Observables
 */
export class Observer {
  constructor(fn) {
    this.subscription = fn;
    this.active = true;
  }
  
  // called by an observable to propagate new values
  // this will be called [0, n] times by the Observable
  update(value) {
    if (this.active) {
      this.subscription(value);
    }
  }
  
  // unsubscribe just prevents update from calling our subscribed function
  // this way we don't have to worry about the state in the Observable
  // and could allow us to resume reciving updates if needed
  unsubscribe() {
    this.active = false;
  }
}