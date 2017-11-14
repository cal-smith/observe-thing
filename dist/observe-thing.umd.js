(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["observe-thing"] = factory();
	else
		root["observe-thing"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observer = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * base class that recives updated values through it's next() method
 * and dispatches them through it's notifyObservers() method
 * The Observable instance keeps a list of all subscribed Observers,
 * and attempts to notify them when a new value is provided. It's up
 * to each Observer to decide how to handle the message
 */
var Observable = exports.Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.observers = [];
    this.active = true;
  }

  // recives the next value and trys to notifyObservers


  _createClass(Observable, [{
    key: "next",
    value: function next(value) {
      if (this.active) {
        this.notifyObservers(value);
      }
    }

    // simple loop through each observer and call it's .update() method

  }, {
    key: "notifyObservers",
    value: function notifyObservers(value) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var observer = _step.value;

          observer.update(value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    // instnatiates a new Observer with the provided function and adds it to the list
    // also returns the new instance so it can be retained and unsubscribed from
    // for more flexiblity this should also allow already instantiated Obsever instances
    // in addition to just functions

  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      var newObserver = new _observer.Observer(fn);
      this.observers.push(newObserver);
      return newObserver;
    }

    // similar pattern with unsubscribe setting active true/false
    // but here it's a little more "permenant" since it removes the
    // references to the observers. If we wanted this to be a resumable
    // Observable we could move the nullification to a .destroy() method
    // and just de-activate notification here

  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this.active = false;
      this.observers = null;
    }
  }]);

  return Observable;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * this handles calling the subscribed callbacks with updated values
 * and unsubscribing from updates
 * Observers are instantiated and maintained by Observables
 */
var Observer = exports.Observer = function () {
  function Observer(fn) {
    _classCallCheck(this, Observer);

    this.subscription = fn;
    this.active = true;
  }

  // called by an observable to propagate new values
  // this will be called [0, n] times by the Observable


  _createClass(Observer, [{
    key: "update",
    value: function update(value) {
      if (this.active) {
        this.subscription(value);
      }
    }

    // unsubscribe just prevents update from calling our subscribed function
    // this way we don't have to worry about the state in the Observable
    // and could allow us to resume reciving updates if needed

  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this.active = false;
    }
  }]);

  return Observer;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observable = __webpack_require__(0);

Object.keys(_observable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observable[key];
    }
  });
});

var _observer = __webpack_require__(1);

Object.keys(_observer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observer[key];
    }
  });
});

var _operators = __webpack_require__(3);

Object.keys(_operators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _operators[key];
    }
  });
});

var _eventObservable = __webpack_require__(4);

Object.keys(_eventObservable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventObservable[key];
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = exports.map = undefined;

var _observable = __webpack_require__(0);

/*
 * functions to work with and transform Observables
 * similar in many ways to rxjs's operators, but
 * written in a more functional style
 */

var map = exports.map = function map(fn, sourceObservable) {
  if (!sourceObservable) {
    return map.bind(null, fn);
  }
  console.log("h", fn, sourceObservable);
  var mappedObservable = new _observable.Observable();
  sourceObservable.subscribe(function (value) {
    console.log("wtf", value, fn(value));
    mappedObservable.next(fn(value));
  });
  console.log(mappedObservable);
  return mappedObservable;
};

var filter = exports.filter = function filter(fn, sourceObservable) {
  if (!sourceObservable) {
    return filter.bind(null, fn);
  }
  var filteredObservable = new _observable.Observable();
  sourceObservable.subscribe(function (value) {
    if (fn(value)) {
      filteredObservable.next(value);
    }
  });
  return filteredObservable;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _observable = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * a specialization of an Observable that takes an event name (click, keyup, etc)
 * and an element, sets up a listener, and provides the event as the Observable .next() value
 */
var EventObservable = exports.EventObservable = function (_Observable) {
  _inherits(EventObservable, _Observable);

  function EventObservable(event, element) {
    _classCallCheck(this, EventObservable);

    // keep the event so we can remove the listener
    var _this = _possibleConstructorReturn(this, (EventObservable.__proto__ || Object.getPrototypeOf(EventObservable)).call(this));

    _this.event = event;
    // re-bind the handler so we keep the right this
    _this.handler = _this.handler.bind(_this);
    _this.listener = element.addEventListener(_this.event, _this.handler);
    return _this;
  }

  // seperate handler function that propagates events to .next()


  _createClass(EventObservable, [{
    key: "handler",
    value: function handler(ev) {
      this.next(ev);
    }

    // again, we go all out in the Observable unsubscribe - we remove the listener
    // the Observers don't care about this, they just stop listening when they
    // unsubscribe

  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      _get(EventObservable.prototype.__proto__ || Object.getPrototypeOf(EventObservable.prototype), "unsubscribe", this).call(this);
      this.listener.removeEventListener(this.event, this.handler);
    }
  }]);

  return EventObservable;
}(_observable.Observable);

/***/ })
/******/ ]);
});
//# sourceMappingURL=observe-thing.umd.js.map