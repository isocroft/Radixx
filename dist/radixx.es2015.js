/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/es/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/es/components/dispatcher.js":
/*!*****************************************!*\
  !*** ./src/es/components/dispatcher.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Area = exports.Dispatcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arguments = arguments;

var _basics = __webpack_require__(/*! ../utils/routines/basics.js */ "./src/es/utils/routines/basics.js");

var _extras = __webpack_require__(/*! ../utils/routines/extras.js */ "./src/es/utils/routines/extras.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

try {
	var ce = new _basics.wind.CustomEvent('test');
} catch (e) {

	CEvent.prototype = _basics.wind.Object.create(w.Event && w.Event.prototype || {});
	_basics.wind.CustomEvent = null;
	_basics.wind.CustomEvent = CEvent;
}

var persistStore = _basics.wind.top !== _basics.wind || !_basics.wind.localStorage ? null : _basics.wind.localStorage;

var sessStore = _basics.wind.top !== _basics.wind || !_basics.wind.sessionStorage ? _basics.wind.opera && !_basics.Hop.call(_basics.wind, 'opera') ? _basics.wind.opera.scriptStorage : {} : _basics.wind.sessionStorage;

var mode = _basics.wind.document.documentMode || 0;

var autoRehydrationOccured = false;

var config = null;

var watchers = [];

var stores = {};

var storeKeys = [];

var observers = {};

var _promises = {};

var waitQueue = [];

var cachedStorageKeys = {};

var getAppOriginForPersist = function getAppOriginForPersist(cfg) {
	return String(_basics.wind.location.origin + (cfg.localHostDev ? ':' + _basics.wind.document.documentElement.id : ''));
};

var generateTag = function generateTag(origin) {

	var _cdata = persistStore.getItem(origin);

	if (!(0, _basics.isNullOrUndefined)(_cdata)) {

		return getNormalized(_cdata);
	}

	return String(Math.random()).replace('.', 'x_').substring(0, 11);
};

var defaultConfig = {
	runtime: {
		spaMode: true,
		shutDownHref: ''
	},
	persistenceEnabled: false,
	autoRehydrate: false,
	universalCoverage: false,
	localHostDev: false
};

var triggerEvt = function triggerEvt(target, eType, detail, globale) {
	var evt = new CustomEvent(eType, {
		detail: detail,
		cancelable: true,
		bubbles: false
	}); // a stub function - just in case

	var dispatch = function dispatch() {
		return false;
	};

	if (!('target' in evt) && evt.cancelBubble === true) {

		target.setCapture(true);
	}

	// set up cross-browser dispatch method.
	dispatch = target[!('target' in evt) ? "fireEvent" : "dispatchEvent"];

	// Including support for IE 8 here ;)
	return dispatch.apply(target, !('target' in evt) ? ['on' + eType, evt] : [evt]);
};

var operationOnStoreSignal = function operationOnStoreSignal(fn, queueing, area, action) {

	// first, retrieve the very first state data and cache it
	if (fn.$$history.length == 1 && !fn.$$initData) {

		fn.$$initData = fn.$$history[0];
	}

	// second, make sure that there is no future state to forth on	
	fn.$$history = fn.$$history.slice(0, fn.$$historyIndex + 1);

	// lets setup a place to store new state, also mark out the context of this call
	var newStoreState = false,
	    len = void 0,
	    _key = void 0;

	// create a new state of the store data by applying a given
	// store callback function to the current history head

	if (queueing === null) {

		if (action !== null) {

			newStoreState = action.actionData;
		} else {

			newStoreState = fn.$$history[fn.$$historyIndex];
		}

		coverageNotifier.$$historyLocation = fn.$$historyIndex;
	} else {

		newStoreState = fn.call(queueing, action, area.get());

		coverageNotifier.$$historyLocation = null;
	}

	if (typeof newStoreState == 'boolean' || newStoreState == undefined) {

		throw new TypeError("Radixx: Application State unavailable after signal to Dispatcher");

		return;
	}

	_key = area.put(newStoreState);

	coverageNotifier.$$currentStoreTitle = _key;

	if (action !== null) {

		if (action.source !== 'hydrate') {
			;
		}

		triggerEvt(_basics.wind.document, 'storesignal', {
			url: _basics.wind.location.href,
			key: _key,
			newValue: newStoreState,
			source: _basics.wind,
			aspect: action.actionKey,
			type: action.actionType
		}, _basics.wind);

		coverageNotifier.$$withAction = true;

		// add the new state to the history list and increment
		// the index to match in place
		len = fn.$$history.push(newStoreState); /* @TODO: use {action.actionType} as operation Annotation */

		fn.$$historyIndex++;

		if (fn.$$history.length > 21) {
			// can't undo/redo (either way) more than 21 moves at any time

			fn.$$history.unshift();
		}
	} else {

		return newStoreState;
	}
};

var getNormalized = function getNormalized(val) {

	if ((0, _basics.isNullOrUndefined)(val) || val === "null") return null;

	try {
		return JSON.parse(val);
	} catch (e) {
		return String(val);
	}
};

var setNormalized = function setNormalized(val) {

	if ((0, _basics.isNullOrUndefined)(val)) val = null;

	try {
		return JSON.stringify(val);
	} catch (e) {

		return String(val);
	}
};

var getCurrentActionOnStack = function getCurrentActionOnStack() {

	var actionStack = operationOnStoreSignal.$$redoActionsStack;

	if (actionStack.lenth) {
		return actionStack[actionStack.length - 1];
	}

	return null;
};

var coverageNotifier = function coverageNotifier(appState) {

	var currentAction = null;

	var _tag = coverageNotifier.$$tag;

	if (_arguments.callee.$$withAction === true) {
		currentAction = getCurrentActionOnStack();
		_arguments.callee.$$withAction = null;
	}

	if (!(0, _basics.isNullOrUndefined)(_tag) && persistStore !== null) {

		persistStore.setItem(_tag, setNormalized({
			state: appState,
			action: currentAction,
			title: _arguments.callee.$$currentStoreTitle,
			historyLoc: _arguments.callee.$$historyLocation
		}));

		_arguments.callee.$$historyLocation = null;
	}
};

var fireWatchers = function fireWatchers(state, omitCallback) {

	var pos = void 0,
	    watcher = void 0;

	for (pos in watchers) {
		if (_basics.Hop.call(watchers, pos)) {
			watcher = watchers[pos];
			if (omitCallback) {
				if (watcher.$$canOmit) {
					continue;
				};
			}
			watcher.call(null, state);
		}
	}
};

var setAppState = function setAppState(appState) {

	(0, _basics.each)(appState, function (isolatedState, storeTitle) {

		var area = new Area(storeTitle);

		area.put(isolatedState);
	});

	fireWatchers(appState, true);
};

var getAppState = function getAppState() {

	var appStateData = {};
	var key = void 0;
	var indexStart = void 0;
	var indexEnd = void 0;
	var values = void 0;
	var _data = void 0;

	if ('key' in sessStore && typeof sessStore.key == 'function') {

		// We iterate this way so we can support IE 8 + other browsers
		for (var i = 0; i < sessStore.length; i++) {
			key = sessStore.key(i);
			_data = sessStore.getItem(key);

			if (!_data) {
				;
			}

			appStateData[key] = getNormalized(_data) || null;
		}
	} else {

		for (var i = 0; i < storeKeys.length; i++) {

			key = storeKeys[i];

			if (cachedStorageKeys[key]) {

				indexStart = _basics.wind.name.indexOf(key);

				indexEnd = _basics.wind.name.indexOf('|', indexStart);

				values = _basics.wind.name.substring(indexStart, indexEnd).split(':=:') || ["", null];

				_data = values[1];
			}

			appStateData[key] = getNormalized(_data) || null;
		}
	}

	return appStateData;
};

var handlePromises = function handlePromises() {
	var promise = null;
	var state = getAppState();

	for (var _title2 in _promises) {
		if (_basics.Hop.call(_promises, _title2)) {
			promise = _promises[_title2];
			if (!promise.isResolved()) {
				promise.resolve();
			}
			delete _promises[_title2];
		}
	}

	waitQueue.length = 0;

	fireWatchers(state);
};

var enforceCoverage = function enforceCoverage(e) {

	var _origin = _arguments.callee.$$origin;
	var _tag = _arguments.callee.$$tag;
	var _action = null;
	var _state = null;
	var _title = null;
	var _hloc = null;
	var _composedData = null;
	var observer = null;

	// Detecting IE 8 to apply mild hack on event object
	if ('remainingSpace' in sessStore) {
		e.key = e.detail.key;
	}

	if (!persistStore || _origin === e.key) {
		// if we can't find the key in the array `storeKeys`
		return;
	}

	_composedData = getNormalized(persistStore.getItem(_tag));

	if (_tag === e.key && (0, _basics.isNullOrUndefined)(_composedData)) {
		return;
	}

	_state = _composedData.state;

	_action = _composedData.action;

	_title = _composedData.title;

	_hloc = parseInt(_composedData.historyLoc);

	if (_action !== null) {
		operationOnStoreSignal.$$redoActionsStack.push(_action);
	}

	if (_hloc !== null) {
		observer = observers[_title];
		if (observer) {
			observer.$$historyIndex = _hloc;
			if (_hloc === -1) {
				observer.$$history.length = 0;
			}
		}
	}

	if (_state) {
		setTimeout(setAppState.bind(null, _state), 0);
	}
};

var stateWatcher = function stateWatcher(e) {

	e = e || _basics.wind.event;

	if (storeKeys.includes(e.detail.key)) {
		var storeTitle = e.detail.key;
		var listeners = void 0;

		if (!(0, _basics.isNullOrUndefined)(observers[storeTitle])) {

			listeners = observers[storeTitle].$$store_listeners;

			for (var t = 0; t < listeners.length; t++) {

				listeners[t].call(stores[storeTitle], e.detail.type, e.detail.aspect);
			}
		}
	}
};

/**
    Though IE 9 to IE 11 supports the CustomEvent constructor, IE throws an error {Object doesn't support this action} 
    whenever it's used. This weird behaviour is fixed below
    See: https://stackoverflow.com/questions/14358599/object-doesnt-support-this-action-ie9-with-customevent-initialization
*/

function CEvent(event, params) {
	var t = void 0;
	var evt = void 0;
	var d = _basics.wind.document;
	params = params || { bubbles: false, cancelable: false, detail: undefined };

	try {
		evt = d.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	} catch (e) {
		evt = d.createEventObject(w.event);
		evt.cancelBubble = !params.bubbles;
		evt.returnValue = !params.cancelable;

		if (_typeof(params.detail) === "object") {
			// set expando properties on event object

			/*for(t in params.detail){
      if((({}).hasOwnProperty.call(params.detail, t))){
        evt[t] = params.detail[t];
      }
   }*/
			evt.detail = params.detail;
		}
	}

	return evt;
}

function setupConfigSettings(config, hub) {

	if (config.universalCoverage) {

		config.persistenceEnabled = true;
	}

	if (config.persistenceEnabled) {

		// prepare Origin 
		var _origin = getAppOriginForPersist(config);

		var _tag = generateTag(_origin);

		persistStore.setItem(_origin, _tag);

		enforceCoverage.$$origin = _origin;

		enforceCoverage.$$tag = _tag;

		coverageNotifier.$$canOmit = true;

		coverageNotifier.$$tag = _tag;

		hub.onDispatch(coverageNotifier);
	}

	if (config.autoRehydrate === true) {

		var data = null;

		if (!(0, _basics.isNullOrUndefined)(enforceCoverage.$$tag) && persistStore) {
			data = getNormalized(persistStore.getItem(enforceCoverage.$$tag));
		}

		if (data instanceof Object && data.state) {
			setAppState(data.state);
			this.updateAutoRehydrationState();
		}
	}

	if (!config.runtime.spaMode) {

		if (typeof config.runtime.shutDownHref === 'string' && config.runtime.shutDownHref.length != 0) {

			_basics.wind.onbeforeunload = (0, _extras.$createBeforeTearDownCallback)(config);

			_basics.wind.onunload = (0, _extras.$createTearDownCallback)(hub);
		}
	} else {

		if (typeof config.runtime.shutDownHref === 'string' && config.runtime.shutDownHref.length != 0) {

			if (_basics.wind.addEventListener) {
				_basics.wind.document.documentElement.addEventListener('click', (0, _extras.$createBeforeTearDownCallback)(config), false);
				_basics.wind.document.addEventListener('click', (0, _extras.$createTearDownCallback)(hub), false);
			} else {
				_basics.wind.document.documentElement.attachEvent('onclick', (0, _extras.$createBeforeTearDownCallback)(config));
				_basics.wind.document.attachEvent('onclick', (0, _extras.$createTearDownCallback)(hub), false);
			}
		}
	}
}

var Area = function Area(key) {

	this.put = function (value) {

		/* 
  	In IE 8-9, writing to sessionStorage is done asynchronously (other browsers write synchronously)
  	we need to fix this by using IE proprietary methods 
  	See: https://www.nczonline.net/blog/2009/07/21/introduction-to-sessionstorage/ 
  */

		var indexStart = void 0;

		var indexEnd = void 0;

		var isIE8Storage = 'remainingSpace' in sessStore && mode === 8;

		// Detecting IE 8 to enable forced sync
		if (isIE8Storage) {
			if (typeof sessStore.begin == 'function') {
				sessStore.begin();
			}
		}

		try {

			sessStore.setItem(key, setNormalized(value));
		} catch (e) {

			/* This is a fallback to support Opera Mini 4.4+ on Mobile */

			if (cachedStorageKeys[key]) {
				// we're in overwrite mode, so clear `key` out and push in update (below)
				indexStart = _basics.wind.name.indexOf(key);

				indexEnd = _basics.wind.name.indexOf('|', indexStart);

				_basics.wind.name = _basics.wind.name.replace(_basics.wind.name.substring(indexStart, indexEnd), '');
			}

			if (_basics.wind.name === "") {

				_basics.wind.name = key + ':=:' + setNormalized(value) + '|';
			} else {

				_basics.wind.name += key + ':=:' + setNormalized(value) + '|';
			}

			cachedStorageKeys[key] = 1;
		}

		if (isIE8Storage) {
			if (typeof sessStore.commit == 'function') {
				sessStore.commit();
			}
		}

		return key;
	};

	this.get = function () {

		var indexStart = void 0,
		    indexEnd = void 0,
		    values = void 0;

		/* This is a fallback to support Opera Mini 4.4+ on Mobile */

		try {

			return getNormalized(sessStore.getItem(key)) || null;
		} catch (e) {

			if (cachedStorageKeys[key]) {

				indexStart = _basics.wind.name.indexOf(key);

				indexEnd = _basics.wind.name.indexOf('|', indexStart);

				values = _basics.wind.name.substring(indexStart, indexEnd).split(':=:') || [0, 0];

				return getNormalized(values[1]) || null;
			}

			return null;
		}
	};

	this.del = function () {

		var indexStart = void 0;

		var indexEnd = void 0;
		/* This is a fallback to support Opera Mini 4.4+ on Mobile */

		try {

			return sessStore.removeItem(key);
		} catch (e) {

			if (cachedStorageKeys[key]) {

				// we're in delete mode
				indexStart = _basics.wind.name.indexOf(key);

				indexEnd = _basics.wind.name.indexOf('|', indexStart);

				_basics.wind.name = _basics.wind.name.replace(_basics.wind.name.substring(indexStart, indexEnd), '');

				delete cachedStorageKeys[key];
			}

			return;
		}
	};

	return this;
};

var Dispatcher = function () {
	function Dispatcher() {
		_classCallCheck(this, Dispatcher);

		this.middlewares = [];

		operationOnStoreSignal.$$undoActionsStack = [];

		operationOnStoreSignal.$$redoActionsStack = [];
	}

	_createClass(Dispatcher, [{
		key: 'updateAutoRehydrationState',
		value: function updateAutoRehydrationState() {

			autoRehydrationOccured = true;
		}
	}, {
		key: 'getAutoRehydrationState',
		value: function getAutoRehydrationState() {

			return autoRehydrationOccured;
		}
	}, {
		key: 'setMiddleware',
		value: function setMiddleware(middleware) {

			if (typeof middleware === 'function'
			/*&& (middleware.length >= 2)*/) {

					return this.middlewares.push(middleware);
				}

			throw new Error("Radixx: Inavlid Middleware Callback - Must be a Function with Parameters ( >= 2 )");
		}
	}, {
		key: 'hasMiddleware',
		value: function hasMiddleware() {

			return this.middlewares.length > 0;
		}
	}, {
		key: 'initCatchers',
		value: function initCatchers(userConfig, hub) {

			if ((0, _basics.isNullOrUndefined)(config)) {

				config = (0, _basics.extend)(userConfig, defaultConfig);

				setupConfigSettings.apply(this, [config, hub]);
			}

			if (_basics.wind.document.addEventListener) {
				/* IE 9+, W3C browsers all expect the 'storage' event to be bound to the window */
				if (config.universalCoverage) {
					_basics.wind.addEventListener('storage', enforceCoverage, false);
				}

				_basics.wind.document.addEventListener('storesignal', stateWatcher, false);
			} else if (_basics.wind.document.attachEvent) {
				/* IE 8 expects the 'storage' event handler to be bound to the document 
        and not to the window */
				if (config.universalCoverage) {
					_basics.wind.document.attachEvent('onstorage', enforceCoverage);
				}

				_basics.wind.document.attachEvent('onstoresignal', stateWatcher);
			}
		}
	}, {
		key: 'getRegistration',
		value: function getRegistration(title) {

			if (_basics.Hop.call(observers, title)) {

				return observers[title];
			}

			return {};
		}
	}, {
		key: 'register',
		value: function register(title, observer, defaultStoreContainer) {

			if (_basics.Hop.call(observers, title)) {

				if ('$$history' in observers[title] && typeof observer.$$history == 'undefined') {
					if (!stores[title]) {
						// If the store doesn't have any change listeners registered

						throw new Error("Radixx: Cannot Overwrite existing store registration");

						return;
					}

					observer.$$history = observers[title].$$history;
					observer.$$historyIndex = observers[title].$$historyIndex;
					observer.$$store_listeners = observers[title].$$store_listeners;
					observers[title] = observer;
				}
			} else {

				observer.$$store_listeners = [];
				observer.$$history = [!!defaultStoreContainer ? defaultStoreContainer : []];
				observer.$$historyIndex = 0;
				observers[title] = observer;
				storeKeys.push(title);
			}

			return true;
		}
	}, {
		key: 'watch',
		value: function watch(callback) {

			watchers.push(callback);
		}
	}, {
		key: 'setStoreListener',
		value: function setStoreListener(store, callback) {

			var title = store.getTitle();

			if (!(0, _basics.isNullOrUndefined)(observers[title])) {

				if (typeof callback == "function") {
					stores[title] = store;
					observers[title].$$store_listeners.push(callback);
				}
			}
		}
	}, {
		key: 'unsetStoreListener',
		value: function unsetStoreListener(store, callback) {

			var title = store.getTitle();

			if (!(0, _basics.isNullOrUndefined)(observers[title])) {
				if (typeof callback == "function") {

					var pos = observers[title].$$store_listeners.indexOf(callback);
					observers[title].$$store_listeners.splice(pos, 1);
				}
			}
		}
	}, {
		key: 'signalUnique',
		value: function signalUnique(hydrateAction) {

			if (hydrateAction.source != 'hydrate') {
				return;
			}

			// Pass this on to the event queue [await]
			_basics.wind.setTimeout(handlePromises, 0);

			var stateArea = new Area(hydrateAction.target),
			    regFunc = observers[hydrateAction.target];

			operationOnStoreSignal.$$redoActionsStack.length = 0;

			operationOnStoreSignal.$$redoActionsStack.push(hydrateAction);

			regFunc.$$history.length = 0; // clear out the store state since this is a hydrate call

			regFunc.historyIndex = -1;

			operationOnStoreSignal.apply(undefined, [regFunc, null, stateArea, hydrateAction]);
		}
	}, {
		key: 'handleStoreMutation',
		value: function handleStoreMutation(store, mutationType) {

			if (!mutationType) {
				return;
			}

			var storeTitle = store.getTitle();
			var isolatedState = {};
			var regFunc = this.getRegistration(storeTitle);
			var stateArea = new Area(storeTitle);

			switch (mutationType) {

				case 'undo':
					if (store.canUndo()) {

						--regFunc.$$historyIndex;

						isolatedState[storeTitle] = operationOnStoreSignal.apply(undefined, [regFunc, null, stateArea, null]);

						// Pass this on to the event queue 
						_basics.wind.setTimeout(fireWatchers.bind(null, isolatedState), 0);

						return true;
					}
					break;
				case 'redo':
					if (store.canRedo()) {

						++regFunc.$$historyIndex;

						isolatedState[storeTitle] = operationOnStoreSignal.apply(undefined, [regFunc, null, stateArea, null]);

						// Pass this on to the event queue 
						_basics.wind.setTimeout(fireWatchers.bind(null, isolatedState), 0);

						return true;
					}
					break;
			}

			return false;
		}
	}, {
		key: 'deletePersistenceTagAndData',
		value: function deletePersistenceTagAndData() {

			if ((0, _basics.isNullOrUndefined)(config)) {

				return false;
			}

			var _origin = getAppOriginForPersist(config);

			var _tag = generateTag(_origin);

			persistStore.removeItem(_origin);

			persistStore.removeItem(_tag);

			return true;
		}
	}, {
		key: 'rebuildStateFromActions',
		value: function rebuildStateFromActions() {

			var actionsStack = operationOnStoreSignal.$$redoActionsStack;

			(0, _basics.each)(actionsStack, function (action, index) {

				var stateArea = void 0;

				for (title in observers) {
					if (_basics.Hop.call(observers, title)) {

						stateArea = new Area(title);

						observers[title].call(action, stateArea.get());
					}
				}
			}, operationOnStoreSignal);
		}
	}, {
		key: 'signal',
		value: function signal(action) {

			var compactedFunc = null;

			var // this is the function that does the actual dispatch of the 
			baseDispatcher = function baseDispatcher(observers, dispatcher, action, prevState) {

				var title = void 0,
				    stateArea = null;

				operationOnStoreSignal.$$redoActionsStack.push(action);

				for (title in observers) {
					if (_basics.Hop.call(observers, title)) {

						stateArea = new Area(title);

						operationOnStoreSignal.apply(undefined, [observers[title], dispatcher.queueing, stateArea, action]);
					}
				}

				return getAppState();
			};

			var boundBaseDispatcher = baseDispatcher.bind(null, observers, this);

			var adjoiner = {
				/*createActionObject:function(_data, _type){
         
         return {
            source:"",
            actionType:_type,
            actionData:_data,
            actionKey:null
         };
    },*/
				createDispatchResolver: function createDispatchResolver(_action) {

					return boundBaseDispatcher.bind(null, _action);
				}
			};

			var _hasMiddleware = this.hasMiddleware();

			// Some validation - just to make sure everything is okay
			if (!(action.source in dispatchRegistry)) {

				return;
			}

			// determine if there are middleware callbacks registered
			if (_hasMiddleware) {

				// collapse all middleware callbacks into a single callback
				compactedFunc = this.middlewares.concat(boundBaseDispatcher).reduceRight(function (bound, middleware) {
					return middleware.bind(null, bound);
				});
			} else {

				compactedFunc = boundBaseDispatcher;
			}

			// Pass this on to the event queue 
			_basics.wind.setTimeout(handlePromises, 0);

			// begin cascading calls to the middlewares in turn
			// from the last attached middleware all the way up
			// to the first middleware until the action
			// is finally dispatched

			if (!(0, _basics.isNullOrUndefined)(compactedFunc)) {

				compactedFunc.apply(_hasMiddleware ? adjoiner : null, [action, getAppState()]);
			}
		}
	}, {
		key: 'unregister',
		value: function unregister(title) {

			var observer = void 0,
			    store = void 0,
			    index = void 0;

			if (!(0, _basics.isNullOrUndefined)(observers[title])) {
				// initial clean-up

				observer = observers[title];
				store = stores[title];
				observer.$$store_listeners.length = 0;
				observer.$$store_listeners = null;
				observer.$$historyIndex = -1;
				observer.$$history.length = 0;
				observer.$$history = null;

				// more clean-up (freeing memory)
				delete observers[title];
				observer = null;

				delete stores[title];
				store = null;

				index = storeKeys.indexOf(title);

				if (index != -1) {
					storeKeys.splice(index, 1);
				}
			}
		}
	}]);

	return Dispatcher;
}();

exports.Dispatcher = Dispatcher;
exports.Area = Area;

/***/ }),

/***/ "./src/es/components/observable.js":
/*!*****************************************!*\
  !*** ./src/es/components/observable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createActionInterface = exports.createStoreInterface = exports.isAppStateAutoRehydrated = exports.watchDispatcher = exports.setStoreObserver = exports.purgePersistStore = exports.mergeConfig = exports.setupShutdownCallback = exports.registerAction = exports.makeAggregator = exports.eachStore = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _basics = __webpack_require__(/*! ../utils/routines/basics.js */ "./src/es/utils/routines/basics.js");

var _dispatcher = __webpack_require__(/*! ./dispatcher.js */ "./src/es/components/dispatcher.js");

var _extras = __webpack_require__(/*! ../utils/routines/extras.js */ "./src/es/utils/routines/extras.js");

var $instance = null;

var dispatchRegistry = {};

var getInstance = function getInstance() {

	if ($instance === null) {

		$instance = new _dispatcher.Dispatcher();
	}

	return $instance;
};

var getObjectPrototype = function getObjectPrototype(obj) {
	if ('getPrototypeOf' in Object) {
		return Object.getPrototypeOf(obj);
	} else if ('__proto__' in obj) {
		if (!Hop.call(obj, '__proto__')) {
			return obj.__proto__;
		}
	} else if ('constructor' in obj) {
		if (!Hop.call(obj, 'constructor')) {
			return obj.constructor.prototype;
		}
	}
	return obj;
};

var eachStore = function eachStore(fn, extractor, storeArray) {

	each(storeKeys, extractor.bind(storeArray = [], stores));

	var callable = fn;
	var prevIndex = storeArray.length - 1;

	var next = function next() {

		var returnVal = void 0;

		if (prevIndex >= 0) {
			returnVal = Boolean(callable.call(null, storeArray[prevIndex--], next));
		} else {
			callable = !0;
			returnVal = callable;
		}

		return returnVal;
	};

	next();
};

var setActionVectors = function setActionVectors(object, vectors) {

	var _proto = getObjectPrototype(object);
	var dispatcher = getInstance();
	var vector = null;

	for (var creator in vectors) {
		if (Hop.call(vectors, creator)) {
			vector = vectors[creator];
			_proto[creator] = createActionInterface(dispatcher, vector);
		}
	}

	return object;
};

var createStoreInterface = function createStoreInterface(dispatcher, method) {

	return function () {
		var regFunc = void 0;
		var area = void 0;
		var argument = arguments.length ? arguments[0] : null;

		if (method == 'setChangeListener') {

			return dispatcher.setStoreListener(this, argument);
		}

		if (method == 'unsetChangeListener') {

			return dispatcher.unsetStoreListener(this, argument);
		}

		if (method == 'getState') {

			var value = void 0;
			area = new _dispatcher.Area(this.getTitle());
			value = area.get();
			area = null;

			if (value === area) {

				regFunc = dispatcher.getRegistration(this.getTitle());

				return regFunc.$$history.length && regFunc.$$history[0];
			}

			return typeof argument == 'string' && argument in value ? value[argument] : value;
		}

		if (method == 'destroy') {

			var title = void 0,
			    index = void 0;

			if (title in stores) {

				delete stores[title];
			}

			area = new _dispatcher.Area(this.getTitle());

			area.del();

			return area = title = null;
		}

		if (method == 'disconnect') {

			return dispatcher.unregister(this.getTitle());
		}

		if (method == 'hydrate') {

			if ((0, _basics.isNullOrUndefined)(argument)) {
				return;
			}

			return dispatcher.signalUnique({
				source: method,
				target: this.getTitle(),
				actionData: argument
			});
		}

		if (method == 'getQuerySchema') {

			return {};
		}

		if (method == 'setQuerySchema') {

			return true;
		}

		if (method == 'canUndo') {

			regFunc = dispatcher.getRegistration(this.getTitle());

			return regFunc.$$historyIndex != 0;
		}

		if (method == 'swapCallback') {

			return dispatcher.register(this.getTitle(), argument);
		}

		if (method == 'canRedo') {

			regFunc = dispatcher.getRegistration(this.getTitle());

			return regFunc.$$historyIndex !== regFunc.$$history.length - 1;
		}

		if (method == 'undo') {

			return dispatcher.handleStoreMutation(this, method);
		}

		if (method == 'redo') {

			return dispatcher.handleStoreMutation(this, method);
		}
	};
};

var createActionInterface = function createActionInterface(dispatcher, vector) {

	if (!(vector instanceof Object)) {

		throw new TypeError('Invalid Action Creator Vector, expected [object] but found [' + (typeof vector === 'undefined' ? 'undefined' : _typeof(vector)) + ']');
	}

	return function (data, stateAspectKey) {

		// console.log('OUTER-FUNC: ', this.constructor.caller);

		var id = this.getId();

		var typesBitMask = 0;

		if (!(0, _basics.isNullOrUndefined)(dispatchRegistry[id])) {
			dispatchRegistry[id].actionTypes.push(vector);
		}

		if (vector.actionDefinition instanceof Array) {

			each(vector.actionDefinition, function (definition) {

				typesBitMask |= Number(_extras.Values.isOfType(definition, data));
			});

			if (!typesBitMask) {

				throw new TypeError('Action Data Invalid for action: [' + vector.type + ']');
			}
		} else {
			if (!_extras.Values.isOfType(vector.actionDefinition, data)) {

				throw new TypeError('Action Data Invalid for action: [' + vector.type + ']');
			}
		}

		return dispatcher.signal({
			source: id,
			actionType: vector.type,
			actionKey: stateAspectKey || null,
			actionData: data
		});
	};
};

var watchDispatcher = function watchDispatcher(callback) {

	var dispatcher = getInstance();

	dispatcher.watch(callback);
};

var isAppStateAutoRehydrated = function isAppStateAutoRehydrated() {

	var dispatcher = getInstance();

	return dispatcher.getAutoRehydrationState();
};

var setupShutdownCallback = function setupShutdownCallback(callback, hub) {

	hub._ping = callback;
};

var mergeConfig = function mergeConfig(userConfig, hub) {

	var dispatcher = getInstance();

	return dispatcher.initCatchers(userConfig, hub);
};

var purgePersistStore = function purgePersistStore() {

	dispatcher.deletePersistenceTagAndData();
};

var registerAction = function registerAction() {
	/* creates hex value e.g. '0ef352ab287f1' */
	var regId = Math.random().toString(16).substr(2, 13);

	dispatchRegistry[regId] = { actionTypes: [] };

	return regId;
};

var makeAggregator = function makeAggregator() {

	return {
		notifyAllStores: function notifyAllStores() {
			/*
   */
		}
	};
};

var setMiddlewareCallback = function setMiddlewareCallback(middlewareFunc) {

	var dispatcher = getInstance();

	// HERE: using this try/catch for control flow and not defensive programming
	try {

		dispatcher.getMiddleware();
	} catch (ex) {

		dispatcher.setMiddleware(middlewareFunc);
	}
};

var setStoreObserver = function setStoreObserver(object, regFunc, defaultStateObj) {

	if (typeof regFunc !== "function") {
		return null;
	}

	var _proto = getObjectPrototype(object);
	var dispatcher = getInstance();
	var title = object.getTitle();
	var method = null;

	dispatcher.register(title, regFunc, defaultStateObj);

	var methods = ['setChangeListener', 'unsetChangeListener', 'getState', 'disconnect', 'getQuerySchema', 'canRedo', 'canUndo', 'swapCallback', 'undo', 'redo', 'hydrate', 'destroy'];

	for (var c = 0; c < methods.length; c++) {

		method = methods[c];
		_proto[method] = createStoreInterface(dispatcher, method);
	}
};

exports.eachStore = eachStore;
exports.makeAggregator = makeAggregator;
exports.registerAction = registerAction;
exports.setupShutdownCallback = setupShutdownCallback;
exports.mergeConfig = mergeConfig;
exports.purgePersistStore = purgePersistStore;
exports.setStoreObserver = setStoreObserver;
exports.watchDispatcher = watchDispatcher;
exports.isAppStateAutoRehydrated = isAppStateAutoRehydrated;
exports.createStoreInterface = createStoreInterface;
exports.createActionInterface = createActionInterface;

/***/ }),

/***/ "./src/es/index.js":
/*!*************************!*\
  !*** ./src/es/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toString = exports.onShutdown = exports.onDispatch = exports.attachMiddleware = exports.eachStore = exports.configure = exports.requestAggregator = exports.isAppStateAutoRehydrated = exports.purgePersistentStorage = exports.makeActionCreators = exports.makeStore = exports.Payload = exports.Helpers = undefined;

var _observable = __webpack_require__(/*! ./components/observable.js */ "./src/es/components/observable.js");

var observable = _interopRequireWildcard(_observable);

var _extras = __webpack_require__(/*! ./utils/routines/extras.js */ "./src/es/utils/routines/extras.js");

var _helpers = __webpack_require__(/*! ./utils/helpers.js */ "./src/es/utils/helpers.js");

var _helpers2 = _interopRequireDefault(_helpers);

var _primitiveCheckers = __webpack_require__(/*! ./utils/primitive-checkers.js */ "./src/es/utils/primitive-checkers.js");

var _primitiveCheckers2 = _interopRequireDefault(_primitiveCheckers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*!
 * @lib: Radixx
 * @version: 0.1.2
 * @author: Ifeora Okechukwu
 * @created: 30/12/2016
 *
 * All Rights Reserved 2016 - 2018.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * @desc: Implementation of Facebooks' Flux Architecture with a Twist. [ ES6 ]
 */

function toString() {

    return "[object RadixxHub]";
}

var makeStore = function makeStore(dataTitle, registerCallback, defaultStateObj) {

    function _store() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _extras.Store.apply(this, args);
    }

    var storeObject = new _store(dataTitle);

    observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

    return storeObject;
};

var makeActionCreators = function makeActionCreators(vectors) {
    function _action() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        _extras.Action.apply(this, args);
    }

    var actionObject = new _action(observable.registerAction());

    return observable.setActionVectors(actionObject, vectors);
};

var purgePersistentStorage = function purgePersistentStorage() {

    observable.purgePersistStore();
};

var eachStore = function eachStore(callback) {

    return observable.eachStore(callback, function (stores, key) {

        this.push(stores[key]);
    }, null);
};

var _hub = {
    eachStore: eachStore
};

var attachMiddleware = function attachMiddleware(callback) {

    return observable.setMiddlewareCallback(callback);
};

var isAppStateAutoRehydrated = function isAppStateAutoRehydrated() {

    return observable.isAppStateAutoRehydrated();
};

var onDispatch = function onDispatch(handler) {

    if (typeof handler === 'function') {

        observable.watchDispatcher(handler);
    }
};

var configure = function configure(config) {

    return observable.mergeConfig(config, _hub);
};

var onShutdown = function onShutdown(handler) {

    if (typeof handler === "function") {

        observable.setupShutdownCallback(handler, _hub);
    }
};

var requestAggregator = function requestAggregator() {

    return observable.makeAggregator();
};

exports.Helpers = _helpers2.default;
exports.Payload = _primitiveCheckers2.default;
exports.makeStore = makeStore;
exports.makeActionCreators = makeActionCreators;
exports.purgePersistentStorage = purgePersistentStorage;
exports.isAppStateAutoRehydrated = isAppStateAutoRehydrated;
exports.requestAggregator = requestAggregator;
exports.configure = configure;
exports.eachStore = eachStore;
exports.attachMiddleware = attachMiddleware;
exports.onDispatch = onDispatch;
exports.onShutdown = onShutdown;
exports.toString = toString;

/***/ }),

/***/ "./src/es/utils/helpers.js":
/*!*********************************!*\
  !*** ./src/es/utils/helpers.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helpers = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _basics = __webpack_require__(/*! ./routines/basics.js */ "./src/es/utils/routines/basics.js");

var Helpers = exports.Helpers = {
  isEqual: function isEqual(former, latter) {
    if (former === latter) {
      return true;
    }

    if ((typeof former === 'undefined' ? 'undefined' : _typeof(former)) !== 'object' || former === null || (typeof latter === 'undefined' ? 'undefined' : _typeof(latter)) !== 'object' || latter === null) {
      return false;
    }

    var keysA = _basics.wind.Object.keys(former);
    var keysB = _basics.wind.Object.keys(latter);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = _basics.wind.hasOwnProperty.bind(latter);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || former[keysA[i]] !== latter[keysA[i]]) {
        return false;
      }
    }
  }
};

/***/ }),

/***/ "./src/es/utils/primitive-checkers.js":
/*!********************************************!*\
  !*** ./src/es/utils/primitive-checkers.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Payload = undefined;

var _basics = __webpack_require__(/*! ./routines/basics.js */ "./src/es/utils/routines/basics.js");

var Payload = exports.Payload = {
    type: {
        "array": "array",
        "date": "date",
        "string": "string",
        "regexp": "regexp",
        "boolean": "boolean",
        "function": "function",
        "object": "object",
        "number": "number",
        error: function error(value) {

            return value instanceof _basics.wind.Error || value instanceof _basics.wind.TypeError;
        },
        nullable: function nullable(value) {

            return value === null || value === undefined;
        },

        "numeric": {
            Int: function Int(value) {
                return _basics.wind.isFinite(value) && value === _basics.wind.parseInt(value);
            },
            Float: function Float(value) {
                return _basics.wind.isFinite(value) && value === _basics.wind.parseFloat(value);
            }
        },
        any: function any(value) {

            return value !== null || value !== undefined;
        }
    }
};

/***/ }),

/***/ "./src/es/utils/routines/basics.js":
/*!*****************************************!*\
  !*** ./src/es/utils/routines/basics.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var wind = 'undefined' !== typeof process && '[object process]' === {}.toString.call(process) || 'undefined' !== typeof navigator && navigator.product === 'ReactNative' ? global : typeof window !== "undefined" ? window : self;

var Hop = {}.hasOwnProperty;

var Slc = [].slice;

var isNullOrUndefined = function isNullOrUndefined(obj) {
    return obj == void 0;
};

var each = function each(obj, iterator, context) {

    if (context === undefined) {

        context = null;
    }

    for (var prop in obj) {
        if (Hop.call(obj, prop)) {
            iterator.call(context, obj[prop], prop, obj);
        }
    }
};

/**
 *
 * @params
 * @params
 * @return
 */

var extend = function extend(source, dest) {

    var merge = {};

    for (var prop in dest) {
        if (Hop.call(dest, prop)) {

            if (_typeof(dest[prop]) === "object" && dest[prop] !== null) {
                merge[prop] = extend(source[prop], dest[prop]);
            } else if (source && Hop.call(source, prop)) {
                merge[prop] = source[prop];
            } else {
                merge[prop] = dest[prop];
            }
        }
    }

    return merge;
};

var curry = function curry(func, args, context) {
    return function () {
        var _args = Slc.call(arguments);
        return func.apply(context, args.concat(_args));
    };
};

var futuresStates = {
    STARTED: 0,
    AWAIT: 1,
    RESOLVED: 2,
    REJECTED: 3
};

var formatOptions = function formatOptions(opts) {
    var options = {},
        _opts = String(opts).split(",");
    each(_opts, function (key) {
        options[key] = true;
    });
    options.savedData = !1;
    return options;
};

var Routines = function Routines(opts) {
    var options = formatOptions(opts);
    var fireStart = void 0;
    var fireEnd = void 0;
    var index = void 0;
    var fired = void 0;
    var firing = void 0;
    var pending = [];
    var queue = options.multiple && [];

    var fire = function fire(data) {
        options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
        fired = true;
        firing = true; // firing has begun!
        index = fireStart || 0;
        fireEnd = pending.length;

        for (fireStart = 0; index < fireEnd; index++) {
            // @TODO: need to curry args instead of directly binding them #DONE
            wind.setTimeout(curry(pending[index], data[1], data[0]) /*.bind(data[0], data[1])*/, 20); // fire asynchronously (Promises/A+ spec requirement)
        }

        firing = false; // firing has ended!

        if (queue) {
            // deal with the queue if it exists and has any contents...
            if (queue.length) {
                return fire(queue.shift()); // fire on the {queue} items recursively
            }
            // if queue is empty.... then end [flow of control] at this point!
        }

        fire.$decline = false;

        if (options.savedData) {
            if (options.unpack) {
                // clear our {pending} list and free up some memeory!!
                pending.length = 0; // saves the reference {pending} and does not replace it!
            }
        }
    };

    return {
        add: function add() {
            var len = 0;
            if (pending) {
                // if not disbaled

                var start = pending.length;
                (function add(args) {

                    each(args, function (arg) {
                        var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

                        if (type == "function") {
                            len = pending.push(arg);
                        } else {
                            if (!!arg && arg.length && typeof arg != "string") {
                                // inspect recursively
                                add(Slc.call(arg));
                            }
                        }
                    });
                })(Slc.call(arguments));

                if (fired) {
                    // if we have already run the {pending} list of routines at least once, ...
                    if (options.join) {
                        fireStart = start;
                        fireEnd = len; // update info again...
                        fire.$decline = true;
                        fire(options.savedData); // fire with the saved data 
                        this.disable();
                    }
                }
            }
            return len;
        },
        hasFn: function hasFn(fn) {
            var result = false;
            each(pending, function (val) {
                if (typeof fn === "function" && fn === val) result = true;
            }, this);
            return result;
        },
        hasList: function hasList() {
            return !!pending; // [false] only when the disabled(); method has been called!!
        },
        fireWith: function fireWith() /* context, args */{
            if (pending && (!fired || queue)) {
                var args = arguments.length && Slc.call(arguments) || [null, 0];

                if (firing) {
                    // we are currently iterating on the {pending} list of routines
                    queue.push(args); // queue assets for recursive firing within {fire} function later
                } else {
                    fire(args);
                }
            }
        },
        disable: function disable() {
            if (!options.savedData) {
                pending = queue = undefined;
            }
        }
    };
};

// Futures constructor - Promises/A+ Spec Implementation (Influenced by jQuery though...)

var Futures = function Futures() {

    var defTracks = {
        resolve: ['done', 'RESOLVED', Routines(['join', 'save'])],
        reject: ['fail', 'REJECTED', Routines(['join', 'save'])],
        notify: ['progress', 'AWAIT', Routines(['join', 'multiple'])]
    };

    var self = this;
    var keys = Object.keys(defTracks);

    var setter = function setter(fnName, arr, forPromise) {
        var drop = fnName != "notify";
        if (!arr.length && !forPromise) return defTracks[fnName][2].fireWith;
        return !forPromise ? function () {
            if (self.state >= 0 && self.state <= 1) {
                self.state = futuresStates[defTracks[fnName][1]];
            }

            defTracks[fnName][2].fireWith(self === this ? self : this, [].slice.call(arguments));

            if (drop) {
                defTracks[arr[0]][2].disable();
                defTracks[arr[1]][2].disable();
                switch (fnName) {
                    case "reject":
                    case "resolve":
                        self.state = futuresStates[defTracks[fnName][1]];
                        break;
                }
            }
            return true;
        } : function () {
            if (self.state >= 0 && self.state <= 1) {
                defTracks[fnName][2].add.apply(self, Slc.call(arguments));
            }
            return self;
        };
    };

    var i = 0;
    var ax = keys.slice();
    var d = void 0;
    var promise = {};

    // using a closure to define all the functions on the fly...

    for (d in defTracks) {
        if (Hop.call(defTracks, d)) {
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[d + 'With'] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }

    promise.state = futuresStates.STARTED;

    promise.always = function () {
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };

    promise.promise = function (obj) {
        if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object" && !obj.length) {
            for (var _i in promise) {
                if (Hop.call(promise, _i)) {
                    obj[_i] = promise[_i];
                }
            }
            return obj;
        }
        return promise;
    };

    promise.then = function () /* fnDone, fnFail, fnProgress */{
        var ret = void 0;
        var args = [].slice.call(arguments);
        args.forEach(function (item, i) {
            item = typeof item == "function" && item;
            self[defTracks[keys[i]][0]](function () {
                var rt = void 0;
                try {
                    /*
                    	Promises/A+ specifies that errors should be contained
                    	and returned as value of rejected promise
                    */
                    rt = item && item.apply(this, arguments);
                } catch (e) {
                    rt = this.reject(e);
                } finally {
                    if (rt && typeof rt.promise == "function") ret = rt.promise();
                }
            });
        });
        return self.promise(ret);
    };

    promise.isResolved = function () {
        return !defTracks['reject'][2].hasList();
    };
    promise.isRejected = function () {
        return !defTracks['resolve'][2].hasList();
    };
    promise.pipe = promise.then;

    promise.promise(self);

    Futures.STARTED = futuresStates.STARTED;
    Futures.AWAITING = futuresStates.AWAIT;
    Futures.RESOLVED = futuresStates.RESOLVED;
    Futures.REJECTED = futuresStates.REJECTED;

    /* avoid leaking memory with each call to Futures constructor!! */
    setter = ax = d = i = null;

    /* enforce {new} on constructor */
    return self instanceof Futures ? self : new Futures();
};

exports.Hop = Hop;
exports.Slc = Slc;
exports.isNullOrUndefined = isNullOrUndefined;
exports.wind = wind;
exports.each = each;
exports.extend = extend;
exports.curry = curry;
exports.Futures = Futures;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/es/utils/routines/extras.js":
/*!*****************************************!*\
  !*** ./src/es/utils/routines/extras.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$createTearDownCallback = exports.$createBeforeTearDownCallback = exports.Action = exports.Store = exports.Values = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _basics = __webpack_require__(/*! ./basics.js */ "./src/es/utils/routines/basics.js");

var __beforeunload = _basics.wind.onbeforeunload;

var __unload = _basics.wind.onunload;

var __hasDeactivated = false;

var _checkAndKillEventPropagation = function _checkAndKillEventPropagation(event) {
    if (event.type === 'click') {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

var $createBeforeTearDownCallback = function $createBeforeTearDownCallback(config) {
    return function (e) {

        // @See: https://greatgonzo.net/i-know-what-you-did-on-beforeunload/

        /* 
             `lastActivatedNode` variable is used to track the DOM Node that last 
             had focus (or was clicked) just before the browser triggered the `beforeunload` event 
         */

        var lastActivatedNode = _basics.wind.currentFocusElement // Mobile Browsers [ Custom Property ]
        || e.explicitOriginalTarget // old/new Firefox
        || e.srcDocument && e.srcDocument.activeElement // old Chrome/Safari
        || e.currentTarget && e.currentTarget.document.activeElement // Sarafi/Chrome/Opera/IE
        || e.srcElement || e.target;

        // if the "imaginary" user is logging out
        var leaveMessage = "Are you sure you want to leave this page ?";

        var isLogoff = typeof lastActivatedNode.hasAttribute == 'function' && lastActivatedNode.hasAttribute('data-href') && lastActivatedNode.getAttribute('data-href').includes(config.runtime.shutDownHref) || 'href' in lastActivatedNode && lastActivatedNode.href.includes(config.runtime.shutDownHref);

        var __timeOutCallback = function __timeOutCallback() {

            __hasDeactivated = __timeOutCallback.lock;
        };

        // console.log('Node: '+ lastActivatedNode);

        __timeOutCallback.lock = __hasDeactivated = true;
        beforeUnloadTimer = _basics.wind.setTimeout(__timeOutCallback, 0);

        if (isLogoff) {
            // IE/Firefox/Chrome 34+
            if (!!~e.type.indexOf('beforeunload')) {
                e.returnValue = leaveMessage;
            } else {
                _confirm = _basics.wind.confirm && _basics.wind.confirm(leaveMessage);

                if (!_confirm) {
                    _checkAndKillEventPropagation(e);
                }
            }
        } else {
            _checkAndKillEventPropagation(e);
        }

        /* if (isLogoff) isn't true, no beforeunload dialog is shown */
        return isLogoff ? (__timeOutCallback.lock = false) || leaveMessage : _basics.wind.clearTimeout(beforeUnloadTimer);
    };
};

var $createTearDownCallback = function $createTearDownCallback(hub) {
    return function (e) {

        /*
            This seems to be the best way to setup the `unload` event 
            listener to ensure that the load event is always fired even if the page
            is loaded from the `bfcache` (Back-Forward-Cache) of the browser whenever
            the back and/or forward buttons are used for navigation instead of links.
            Registering it as a property of the `window` object sure works every time
        */

        if (!__hasDeactivated) {

            _basics.wind.setTimeout(function () {

                var appstate = {};

                hub.eachStore(function (store, next) {

                    var title = store.getTitle();

                    appstate[title] = store.getState();

                    store.disconnect();
                    store.destroy();

                    next();
                });

                if (typeof hub._ping == "function") {

                    hub._ping.call(hub, appstate);
                }

                if (e.type != 'click') {
                    __unload(e);
                }
            }, 0);
        }
    };
};

var Values = {
    typesMap: {
        "number": Number,
        "array": Array,
        "object": Object,
        "string": String,
        "boolean": Boolean,
        "date": Date,
        "regexp": RegExp,
        "function": Function
    },
    isOfType: function isOfType(type, value) {

        var type = type.toLowerCase(); // hoisting

        if (typeof type === 'function') {

            return type(value);
        } else if (typeof type === 'string' && type in this.typesMap) {
            return (/^string|function$/.test(typeof value === 'undefined' ? 'undefined' : _typeof(value)) || Object(value) instanceof this.typesMap[type]
            );
        }

        return false;
    }
};

// Store Constructor
var Store = function () {

    var requirementTypes = ['graph-ql', 'rest'];

    var serviceRequirementsMap = {};

    return function (title) {

        var that = this;

        this.getTitle = function () {
            return title;
        };

        this.toJSON = function () {
            return {
                title: title
            };
        };

        this.makeTrait = function (callback) {

            if (typeof callback === 'function') {
                for (var _len = arguments.length, argsLeft = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    argsLeft[_key - 1] = arguments[_key];
                }

                argsLeft.unshift(that);

                return callback.apply(undefined, argsLeft);
            }

            return null;
        };

        this.toString = function () {
            return "[object RadixxStore]";
        };
    };
}();

// Action constructor
var Action = function () {
    return function (id) {

        this.getId = function () {
            return id;
        };

        this.toJSON = function () {
            return {
                id: id
            };
        };

        this.toString = function () {
            return "[object RadixxActionCreator]";
        };
    };
}();

exports.Values = Values;
exports.Store = Store;
exports.Action = Action;
exports.$createBeforeTearDownCallback = $createBeforeTearDownCallback;
exports.$createTearDownCallback = $createTearDownCallback;

/***/ })

/******/ });
//# sourceMappingURL=radixx.es2015.js.map