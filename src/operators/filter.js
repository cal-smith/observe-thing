import { Observable } from "./../observable";

/* 
 * filter
 * fn -> Observable -> FilterObservable
 */
class FilterObservable extends Observable {
  constructor(sourceObservable, filterFn) {
    super(sourceObservable);
    this.filterFn = filterFn;
  }

  next(value) {
    if (this.active && this.filterFn(value)) {
      this.notifyObservers(value);
    }
  }
}

export const filter = (fn, sourceObservable) => {
  if (!sourceObservable) {
    return filter.bind(null, fn);
  }
  return new FilterObservable(sourceObservable, fn);
};
