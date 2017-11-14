import { Observable } from "./../observable";

/* 
 * map
 * fn -> Observable -> MapObservable
 */
class MapObservable extends Observable {
  constructor(sourceObservable, mapFn) {
    super(sourceObservable);
    this.mapFn = mapFn;
  }

  next(value) {
    if (this.active) {
      this.notifyObservers(this.mapFn(value));
    }
  }
}

export const map = (fn, sourceObservable) => {
  if (!sourceObservable) {
    return map.bind(null, fn);
  }
  return new MapObservable(sourceObservable, fn);
};