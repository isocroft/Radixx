'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

// 'use strict';  Can't [use strict] mode cos i wish to use {void 0}/{arguments.callee} for checks	

var Hop = {}.hasOwnProperty;

var wind = 'undefined' !== typeof process && '[object process]' === {}.toString.call(process) || 'undefined' !== typeof navigator && navigator.product === 'ReactNative' ? global : typeof window !== "undefined" ? window : self;
var __beforeunload = wind.onbeforeunload;
var __unload = wind.onunload;
var __hasDeactivated = false;

var _ping = function (appState) {
    _newArrowCheck(undefined, undefined);

    return;
}.bind(undefined);

var _checkAndKillEventPropagation = function (event) {
    _newArrowCheck(undefined, undefined);

    if (event.type === 'click') {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}.bind(undefined);

var $createBeforeTearDownCallback = function (config) {
    _newArrowCheck(undefined, undefined);

    return function (e) {
        _newArrowCheck(undefined, undefined);

        // @See: https://greatgonzo.net/i-know-what-you-did-on-beforeunload/

        /* 
             `lastActivatedNode` variable is used to track the DOM Node that last 
             had focus (or was clicked) just before the browser triggered the `beforeunload` event 
         */

        var lastActivatedNode = window.currentFocusElement // Mobile Browsers [ Custom Property ]
        || e.explicitOriginalTarget // old/new Firefox
        || e.srcDocument && e.srcDocument.activeElement // old Chrome/Safari
        || e.currentTarget && e.currentTarget.document.activeElement // Sarafi/Chrome/Opera/IE
        || e.srcElement || e.target;

        var // if the "imaginary" user is logging out
        leaveMessage = "Are you sure you want to leave this page ?";

        var isLogoff = typeof lastActivatedNode.hasAttribute == 'function' && lastActivatedNode.hasAttribute('data-href') && lastActivatedNode.getAttribute('data-href').includes(config.runtime.shutDownHref) || 'href' in lastActivatedNode && lastActivatedNode.href.includes(config.runtime.shutDownHref);

        var __timeOutCallback = function () {
            _newArrowCheck(undefined, undefined);

            __hasDeactivated = __timeOutCallback.lock;
        }.bind(undefined);

        // console.log('Node: '+ lastActivatedNode);

        __timeOutCallback.lock = __hasDeactivated = true;
        beforeUnloadTimer = setTimeout(__timeOutCallback, 0);

        if (isLogoff) {
            // IE/Firefox/Chrome 34+
            if (!!~e.type.indexOf('beforeunload')) {
                e.returnValue = leaveMessage;
            } else {
                _confirm = confirm(leaveMessage);
                if (!_confirm) {
                    _checkAndKillEventPropagation(e);
                }
            }
        } else {
            _checkAndKillEventPropagation(e);
        }

        /* if (isLogoff) isn't true, no beforeunload dialog is shown */
        return isLogoff ? (__timeOutCallback.lock = false) || leaveMessage : clearTimeout(beforeUnloadTimer);
    }.bind(undefined);
}.bind(undefined);

var $createTearDownCallback = function (hub) {
    _newArrowCheck(undefined, undefined);

    return function (e) {
        _newArrowCheck(undefined, undefined);

        /*
            This seems to be the best way to setup the `unload` event 
            listener to ensure that the load event is always fired even if the page
            is loaded from the `bfcache` (Back-Forward-Cache) of the browser whenever
            the back and/or forward buttons are used for navigation instead of links.
            Registering it as a property of the `window` object sure works every time
        */

        if (!__hasDeactivated) {

            setTimeout(function () {
                _newArrowCheck(undefined, undefined);

                var appstate = {};

                hub.eachStore(function (store, next) {
                    _newArrowCheck(undefined, undefined);

                    var title = store.getTitle();

                    appstate[title] = store.getState();

                    store.disconnect();
                    store.destroy();

                    next();
                }.bind(undefined));

                _ping.call(hub, appstate);

                if (e.type != 'click') {
                    __unload(e);
                }
            }.bind(undefined), 0);
        }
    }.bind(undefined);
}.bind(undefined);

var _defaultConfig = {
    runtime: {
        spaMode: true, shutDownHref: ''
    },
    persistenceEnabled: false,
    autoRehydrate: false,
    universalCoverage: false,
    localHostDev: false
};

var Slc = [].slice;

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

var _each = function (obj, iterator, context) {
    _newArrowCheck(undefined, undefined);

    if (context === undefined) {

        context = null;
    }

    for (var prop in obj) {
        if (Hop.call(obj, prop)) {
            iterator.call(context, obj[prop], prop, obj);
        }
    }
}.bind(undefined);

var _extend = function (source, dest) {
    _newArrowCheck(undefined, undefined);

    var merge = {};

    for (var prop in dest) {
        if (Hop.call(dest, prop)) {

            if (_typeof(dest[prop]) === "object" && dest[prop] !== null) {
                merge[prop] = _extend(source[prop], dest[prop]);
            } else if (source && Hop.call(source, prop)) {
                merge[prop] = source[prop];
            } else {
                merge[prop] = dest[prop];
            }
        }
    }

    return merge;
}.bind(undefined);

var _curry = function (func, args, context) {
    _newArrowCheck(undefined, undefined);

    return function () {
        var _args = Slc.call(arguments);
        return func.apply(context, args.concat(_args));
    };
}.bind(undefined);

Array.prototype.forEach = Array.prototype.forEach || function (fn, cxt) {

    return _each(this, fn, cxt);
};

Array.prototype.reduceRight = Array.prototype.reduceRight || function (fn /* initialValue */) {
    if (null === this || 'undefined' === typeof this) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if ('function' !== typeof fn) {
        throw new TypeError(String(callback) + ' is not a function');
    }

    var t = Object(this);
    var len = t.length >>> 0;
    var k = len - 1;
    var value = void 0;

    if (arguments.length >= 2) {

        value = arguments[1];
    } else {

        while (k >= 0 && !(k in t)) {
            k--;
        }

        if (k < 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        value = t[k--];
    }

    for (; k >= 0; k--) {
        if (k in t) {
            value = callback(value, t[k], k, t);
        }
    }
    return value;
};

Function.prototype.bind = Function.prototype.bind || function (cxt /* ,args... */) {

    return _curry(this, [].slice(arguments, 1), cxt);
}

/**
    Though IE 9 to IE 11 supports the CustomEvent constructor, IE throws an error {Object doesn't support this action} 
    whenever it's used. This weird behaviour is fixed below
    See: https://stackoverflow.com/questions/14358599/object-doesnt-support-this-action-ie9-with-customevent-initialization
*/

;(function (w, d) {
    _newArrowCheck(undefined, undefined);

    function CEvent(event, params) {
        var t = void 0;
        var evt = void 0;
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
    try {
        var ce = new w.CustomEvent('test');
    } catch (e) {

        CEvent.prototype = Object.create(w.Event && w.Event.prototype || {});
        w.CustomEvent = null;
        w.CustomEvent = CEvent;
    }
}).bind(undefined)(wind, wind.document);

Object.create = Object.create || function (o, props) {
    _newArrowCheck(undefined, undefined);

    if (o === null || !(o instanceof Object)) {
        throw TypeError("Object.create called on null or non-object argument");
    }

    var prop = void 0;
    function F() {}
    F.prototype = o;

    if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === "object") {
        for (prop in props) {
            if (Hop.call(props, prop)) {
                F[prop] = props[prop];
            }
        }
    }

    return new F();
}.bind(undefined);

Object.keys = Object.keys || function (fu) {
    _newArrowCheck(undefined, undefined);

    if ((typeof fu === 'undefined' ? 'undefined' : _typeof(fu)) != 'object' && typeof fu != 'function') {
        return;
    }

    var j = [];
    for (var k in fuc) {
        if (Hop.call(fuc, k)) {
            j.push(k);
        }
    }
    var l = !ob.propertyIsEnumerable('toString');

    var m = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'prototypeIsEnumerable', 'constructor'];

    if (l) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = m[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var o = _step.value;

                if (Hop.call(fuc, o)) {
                    j.push(o);
                }
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
    return j;
}.bind(undefined);

// Store constructor
var Store = function () {
    _newArrowCheck(undefined, undefined);

    var requirementTypes = ['graph-ql', 'rest'];

    var serviceRequirementsMap = {};

    return function (title) {
        var _this = this;

        var that = this;

        this.getTitle = function () {
            _newArrowCheck(this, _this);

            return title;
        }.bind(this);

        this.toJSON = function () {
            _newArrowCheck(this, _this);

            return {
                title: title
            };
        }.bind(this);

        this.makeTrait = function (callback) {

            var argsLeft = Slc.call(arguments, 1);

            if (typeof callback === 'function') {

                argsLeft.unshift(this);

                return callback.apply(undefined, _toConsumableArray(argsLeft));
            }

            return null;
        };

        this.toString = function () {
            _newArrowCheck(this, _this);

            return "[object RadixxStore]";
        }.bind(this);
    };
}.bind(undefined)();

var // Action constructor 
Action = function () {
    _newArrowCheck(undefined, undefined);

    return function (id) {
        var _this2 = this;

        this.getId = function () {
            _newArrowCheck(this, _this2);

            return id;
        }.bind(this);

        this.toJSON = function () {
            _newArrowCheck(this, _this2);

            return {
                id: id
            };
        }.bind(this);

        this.toString = function () {
            _newArrowCheck(this, _this2);

            return "[object RadixxActionCreator]";
        }.bind(this);
    };
}.bind(undefined)();

var futuresStates = {
    STARTED: 0,
    AWAIT: 1,
    RESOLVED: 2,
    REJECTED: 3
};

var formatOptions = function (opts) {
    _newArrowCheck(undefined, undefined);

    var options = {},
        _opts = String(opts).split(",");
    _opts.forEach(function (key) {
        _newArrowCheck(undefined, undefined);

        options[key] = true;
    }.bind(undefined));
    options.savedData = !1;
    return options;
}.bind(undefined);

var Routines = function (opts) {
    _newArrowCheck(undefined, undefined);

    var options = formatOptions(opts);
    var fireStart = void 0;
    var fireEnd = void 0;
    var index = void 0;
    var fired = void 0;
    var firing = void 0;
    var pending = [];
    var queue = options.multiple && [];

    var fire = function (data) {
        _newArrowCheck(undefined, undefined);

        options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
        fired = true;
        firing = true; // firing has begun!
        index = fireStart || 0;
        fireEnd = pending.length;
        for (fireStart = 0; index < fireEnd; index++) {
            // @TODO: need to curry args instead of directly binding them #DONE
            setTimeout(_curry(pending[index], data[1], data[0]) /*.bind(data[0], data[1])*/, 20); // fire asynchronously (Promises/A+ spec requirement)
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
    }.bind(undefined);

    return {
        add: function add() {
            var len = 0;
            if (pending) {
                // if not disbaled

                var start = pending.length;
                (function add(args) {
                    var _this3 = this;

                    args.forEach(function (arg) {
                        _newArrowCheck(this, _this3);

                        var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

                        if (type == "function") {
                            len = pending.push(arg);
                        } else {
                            if (!!arg && arg.length && typeof arg != "string") {
                                // inspect recursively
                                add(Slc.call(arg));
                            }
                        }
                    }.bind(this));
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
            var _this4 = this;

            var result = false;
            _each(pending, function (val) {
                _newArrowCheck(this, _this4);

                if (typeof fn === "function" && fn === val) result = true;
            }.bind(this), this);
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
}.bind(undefined);

var // Futures constructor - Promises/A+ Spec Implementation (Influenced by jQuery though...)
Futures = function Futures() {
    var _this5 = this;

    var defTracks = {
        resolve: ['done', 'RESOLVED', Routines(['join', 'save'])],
        reject: ['fail', 'REJECTED', Routines(['join', 'save'])],
        notify: ['progress', 'AWAIT', Routines(['join', 'multiple'])]
    };

    var self = this;
    var keys = Object.keys(defTracks);

    var setter = function (fnName, arr, forPromise) {
        _newArrowCheck(this, _this5);

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
    }.bind(this);

    var i = 0;
    var ax = keys.slice();
    var d = void 0;
    var promise = {};

    // using a closure to define all the functions on the fly...

    for (d in defTracks) {
        if (Hop.call(defTracks, d)) {
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[String(d) + 'With'] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }

    promise.state = futuresStates.STARTED;

    promise.always = function () {
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };

    promise.promise = function (obj) {
        _newArrowCheck(this, _this5);

        if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object" && !obj.length) {
            for (var _i in promise) {
                if (Hop.call(promise, _i)) {
                    obj[_i] = promise[_i];
                }
            }
            return obj;
        }
        return promise;
    }.bind(this);

    promise.then = function () /* fnDone, fnFail, fnProgress */{
        var _this6 = this;

        var ret = void 0;
        var args = [].slice.call(arguments);
        args.forEach(function (item, i) {
            _newArrowCheck(this, _this6);

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
        }.bind(this));
        return self.promise(ret);
    };

    promise.isResolved = function () {
        _newArrowCheck(this, _this5);

        return !defTracks['reject'][2].hasList();
    }.bind(this);
    promise.isRejected = function () {
        _newArrowCheck(this, _this5);

        return !defTracks['resolve'][2].hasList();
    }.bind(this);
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

var Observable = function (win) {
    _newArrowCheck(undefined, undefined);

    var $instance = null;
    var persistStore = win.top !== win || !win.localStorage ? null : win.localStorage;
    var sessStore = win.top !== win || !win.sessionStorage ? win.opera && !Hop.call(win, 'opera') ? win.opera.scriptStorage : {} : win.sessionStorage;
    var mode = win.document.documentMode || 0;
    var autoRehydrationOccured = false;

    var config = {};

    var watchers = [];

    var stores = {};

    var storeKeys = [];

    var observers = {};

    var _promises = {};

    var waitQueue = [];

    var dispatchRegistry = {};

    var cachedStorageKeys = {};

    var getObjectPrototype = function (obj) {
        _newArrowCheck(undefined, undefined);

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
    }.bind(undefined);

    var isNullOrUndefined = function (obj) {
        _newArrowCheck(undefined, undefined);

        return obj == void 0;
    }.bind(undefined);

    var triggerEvt = function (target, eType, detail, globale) {
        _newArrowCheck(undefined, undefined);

        var evt = new CustomEvent(eType, {
            detail: detail,
            cancelable: true,
            bubbles: false
        }); // a stub function - just in case

        var dispatch = function () {
            _newArrowCheck(undefined, undefined);

            return false;
        }.bind(undefined);

        if (!('target' in evt) && evt.cancelBubble === true) {

            target.setCapture(true);
        }

        // set up cross-browser dispatch method.
        dispatch = target[!('target' in evt) ? "fireEvent" : "dispatchEvent"];

        // Including support for IE 8 here ;)
        return dispatch.apply(target, !('target' in evt) ? ['on' + String(eType), evt] : [evt]);
    }.bind(undefined);

    var operationOnStoreSignal = function (fn, queueing, area, action) {
        _newArrowCheck(undefined, undefined);

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

            triggerEvt(win.document, 'storesignal', {
                url: win.location.href,
                key: _key,
                newValue: newStoreState,
                source: win,
                aspect: action.actionKey,
                type: action.actionType
            }, win);

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
    }.bind(undefined);

    var getAppOriginForPersist = function (cfg) {
        _newArrowCheck(undefined, undefined);

        return String(location.origin + (cfg.localHostDev ? ':' + document.documentElement.id : ''));
    }.bind(undefined);

    var generateTag = function (origin) {
        _newArrowCheck(undefined, undefined);

        var _cdata = persistStore.getItem(origin);

        if (!isNullOrUndefined(_cdata)) {

            return getNormalized(_cdata);
        }

        return String(Math.random()).replace('.', 'x_').substring(0, 11);
    }.bind(undefined);

    var getNormalized = function (val) {
        _newArrowCheck(undefined, undefined);

        if (isNullOrUndefined(val) || val === "null") return null;

        try {
            return JSON.parse(val);
        } catch (e) {
            return String(val);
        }
    }.bind(undefined);

    var setNormalized = function (val) {
        _newArrowCheck(undefined, undefined);

        if (isNullOrUndefined(val)) val = null;

        try {
            return JSON.stringify(val);
        } catch (e) {

            return String(val);
        }
    }.bind(undefined);

    var setAppState = function (appState) {
        _newArrowCheck(undefined, undefined);

        _each(appState, function (isolatedState, storeTitle) {
            _newArrowCheck(undefined, undefined);

            var area = new Area(storeTitle);

            area.put(isolatedState);
        }.bind(undefined));

        fireWatchers(appState, true);
    }.bind(undefined);

    var getAppState = function () {
        _newArrowCheck(undefined, undefined);

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

                    indexStart = win.name.indexOf(key);

                    indexEnd = win.name.indexOf('|', indexStart);

                    values = win.name.substring(indexStart, indexEnd).split(':=:') || ["", null];

                    _data = values[1];
                }

                appStateData[key] = getNormalized(_data) || null;
            }
        }

        return appStateData;
    }.bind(undefined);

    var Area = function Area(key) {
        var _this7 = this;

        this.put = function (value) {
            _newArrowCheck(this, _this7);

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
                    indexStart = win.name.indexOf(key);

                    indexEnd = win.name.indexOf('|', indexStart);

                    win.name = win.name.replace(win.name.substring(indexStart, indexEnd), '');
                }

                if (win.name === "") {

                    win.name = String(key) + ':=:' + String(setNormalized(value)) + '|';
                } else {

                    win.name += String(key) + ':=:' + String(setNormalized(value)) + '|';
                }

                cachedStorageKeys[key] = 1;
            }

            if (isIE8Storage) {
                if (typeof sessStore.commit == 'function') {
                    sessStore.commit();
                }
            }

            return key;
        }.bind(this);

        this.get = function () {
            _newArrowCheck(this, _this7);

            var indexStart = void 0,
                indexEnd = void 0,
                values = void 0;

            /* This is a fallback to support Opera Mini 4.4+ on Mobile */

            try {

                return getNormalized(sessStore.getItem(key)) || null;
            } catch (e) {

                if (cachedStorageKeys[key]) {

                    indexStart = win.name.indexOf(key);

                    indexEnd = win.name.indexOf('|', indexStart);

                    values = win.name.substring(indexStart, indexEnd).split(':=:') || [0, 0];

                    return getNormalized(values[1]) || null;
                }

                return null;
            }
        }.bind(this);

        this.del = function () {
            _newArrowCheck(this, _this7);

            var indexStart = void 0,
                indexEnd = void 0;
            /* This is a fallback to support Opera Mini 4.4+ on Mobile */

            try {

                return sessStore.removeItem(key);
            } catch (e) {

                if (cachedStorageKeys[key]) {

                    // we're in delete mode
                    indexStart = win.name.indexOf(key);

                    indexEnd = win.name.indexOf('|', indexStart);

                    win.name = win.name.replace(win.name.substring(indexStart, indexEnd), '');

                    delete cachedStorageKeys[key];
                }

                return;
            }
        }.bind(this);

        return this;
    };

    var getCurrentActionOnStack = function () {
        _newArrowCheck(undefined, undefined);

        var actionStack = operationOnStoreSignal.$$redoActionsStack;

        if (actionStack.lenth) {
            return actionStack[actionStack.length - 1];
        }

        return null;
    }.bind(undefined);

    var coverageNotifier = function coverageNotifier(appState) {

        var currentAction = null;

        var _tag = coverageNotifier.$$tag;

        if (arguments.callee.$$withAction === true) {
            currentAction = getCurrentActionOnStack();
            arguments.callee.$$withAction = null;
        }

        if (!isNullOrUndefined(_tag) && persistStore !== null) {

            persistStore.setItem(_tag, setNormalized({
                state: appState,
                action: currentAction,
                title: arguments.callee.$$currentStoreTitle,
                historyLoc: arguments.callee.$$historyLocation
            }));

            arguments.callee.$$historyLocation = null;
        }
    },
        fireWatchers = function (state, omitCallback) {
        _newArrowCheck(undefined, undefined);

        var pos = void 0,
            watcher = void 0;

        for (pos in watchers) {
            if (Hop.call(watchers, pos)) {
                watcher = watchers[pos];
                if (omitCallback) {
                    if (watcher.$$canOmit) {
                        continue;
                    };
                }
                watcher.call(null, state);
            }
        }
    }.bind(undefined),
        handlePromises = function () {
        _newArrowCheck(undefined, undefined);

        var promise = null;
        var state = getAppState();

        for (var _title2 in _promises) {
            if (Hop.call(_promises, _title2)) {
                promise = _promises[_title2];
                if (!promise.isResolved()) {
                    promise.resolve();
                }
                delete _promises[_title2];
            }
        }

        waitQueue.length = 0;

        fireWatchers(state);
    }.bind(undefined),
        enforceCoverage = function enforceCoverage(e) {
        var _origin = arguments.callee.$$origin;
        var _tag = arguments.callee.$$tag;
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

        if (_tag === e.key && isNullOrUndefined(_composedData)) {
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
    },
        stateWatcher = function (e) {
        _newArrowCheck(undefined, undefined);

        e = e || win.event;

        if (storeKeys.includes(e.detail.key)) {
            var storeTitle = e.detail.key;
            var listeners = void 0;

            if (!isNullOrUndefined(observers[storeTitle])) {

                listeners = observers[storeTitle].$$store_listeners;

                for (var t = 0; t < listeners.length; t++) {

                    listeners[t].call(stores[storeTitle], e.detail.type, e.detail.aspect);
                }
            }
        }
    }.bind(undefined);

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
            value: function initCatchers(config) {

                if (config.autoRehydrate === true) {
                    var data = null;
                    if (!isNullOrUndefined(enforceCoverage.$$tag) && persistStore) {
                        data = getNormalized(persistStore.getItem(enforceCoverage.$$tag));
                    }
                    if (data instanceof Object && data.state) {
                        setAppState(data.state);
                        this.updateAutoRehydrationState();
                    }
                }

                if (win.document.addEventListener) {
                    /* IE 9+, W3C browsers all expect the 'storage' event to be bound to the window */
                    if (config.universalCoverage) {
                        win.addEventListener('storage', enforceCoverage, false);
                    }

                    win.document.addEventListener('storesignal', stateWatcher, false);
                } else if (win.document.attachEvent) {
                    /* IE 8 expects the 'storage' event handler to be bound to the document 
                        and not to the window */
                    if (config.universalCoverage) {
                        win.document.attachEvent('onstorage', enforceCoverage);
                    }

                    win.document.attachEvent('onstoresignal', stateWatcher);
                }
            }
        }, {
            key: 'getRegistration',
            value: function getRegistration(title) {

                if (Hop.call(observers, title)) {

                    return observers[title];
                }

                return {};
            }
        }, {
            key: 'register',
            value: function register(title, observer, defaultStoreContainer) {

                if (Hop.call(observers, title)) {

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

                if (!isNullOrUndefined(observers[title])) {
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

                if (!isNullOrUndefined(observers[title])) {
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
                win.setTimeout(handlePromises, 0);

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

                var storeTitle = store.getTitle(),
                    isolatedState = {},
                    regFunc = this.getRegistration(storeTitle),
                    stateArea = new Area(storeTitle);

                switch (mutationType) {

                    case 'undo':
                        if (store.canUndo()) {

                            --regFunc.$$historyIndex;

                            isolatedState[storeTitle] = operationOnStoreSignal.apply(undefined, [regFunc, null, stateArea, null]);

                            // Pass this on to the event queue 
                            win.setTimeout(fireWatchers.bind(null, isolatedState), 0);

                            return true;
                        }
                        break;
                    case 'redo':
                        if (store.canRedo()) {

                            ++regFunc.$$historyIndex;

                            isolatedState[storeTitle] = operationOnStoreSignal.apply(undefined, [regFunc, null, stateArea, null]);

                            // Pass this on to the event queue 
                            win.setTimeout(fireWatchers.bind(null, isolatedState), 0);

                            return true;
                        }
                        break;
                }

                return false;
            }
        }, {
            key: 'rebuildStateFromActions',
            value: function rebuildStateFromActions() {
                var _this8 = this;

                var actionsStack = operationOnStoreSignal.$$redoActionsStack;

                _each(actionsStack, function (action, index) {
                    _newArrowCheck(this, _this8);

                    var stateArea = void 0;

                    for (title in observers) {
                        if (Hop.call(observers, title)) {

                            stateArea = new Area(title);

                            observers[title].call(action, stateArea.get());
                        }
                    }
                }.bind(this), operationOnStoreSignal);
            }
        }, {
            key: 'signal',
            value: function signal(action) {
                var _this9 = this;

                var compactedFunc = null;

                var // this is the function that does the actual dispatch of the 
                baseDispatcher = function (observers, dispatcher, action, prevState) {
                    _newArrowCheck(this, _this9);

                    var title = void 0,
                        stateArea = null;

                    operationOnStoreSignal.$$redoActionsStack.push(action);

                    for (title in observers) {
                        if (Hop.call(observers, title)) {

                            stateArea = new Area(title);
                            operationOnStoreSignal.apply(undefined, [observers[title], dispatcher.queueing, stateArea, action]);
                        }
                    }

                    return getAppState();
                }.bind(this);

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
                        _newArrowCheck(this, _this9);

                        return middleware.bind(null, bound);
                    }.bind(this));
                } else {

                    compactedFunc = boundBaseDispatcher;
                }

                // Pass this on to the event queue 
                win.setTimeout(handlePromises, 0);

                // begin cascading calls to the middlewares in turn
                // from the last attached middleware all the way up
                // to the first middleware until the action
                // is finally dispatched

                if (!isNullOrUndefined(compactedFunc)) {

                    compactedFunc.apply(_hasMiddleware ? adjoiner : null, [action, getAppState()]);
                }
            }
        }, {
            key: 'unregister',
            value: function unregister(title) {

                var observer = void 0,
                    store = void 0,
                    index = void 0;

                if (!isNullOrUndefined(observers[title])) {
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

    Dispatcher.prototype.queueing = {
        await: function _await(titleList, callback) {
            var current = -1;
            var len = titleList.length + current;
            var promise = null;

            while (++current < len) {
                if (waitQueue.includes(titleList[current])) {
                    promise = _promises[titleList[current]];
                } else {
                    promise = _promises[titleList[current]] = new Futures();
                }

                if (typeof callback == "function") {
                    promise.then(callback);
                }
            }
        }
    };

    return {
        getInstance: function getInstance() {

            if ($instance === null) {

                $instance = new Dispatcher();
            }

            return $instance;
        },
        eachStore: function eachStore(fn, extractor, storeArray) {
            var _this10 = this;

            _each(storeKeys, extractor.bind(storeArray = [], stores));

            var callable = fn;
            var prevIndex = storeArray.length - 1;

            var next = function () {
                _newArrowCheck(this, _this10);

                var returnVal = void 0;

                if (prevIndex >= 0) {
                    returnVal = Boolean(callable.call(null, storeArray[prevIndex--], next));
                } else {
                    callable = !0;
                    returnVal = callable;
                }

                return returnVal;
            }.bind(this);

            next();
        },
        setActionVectors: function setActionVectors(object, vectors) {
            var _proto = getObjectPrototype(object);
            var dispatcher = this.getInstance();
            var vector = null;

            for (var creator in vectors) {
                if (Hop.call(vectors, creator)) {
                    vector = vectors[creator];
                    _proto[creator] = this.createActionInterface(dispatcher, vector);
                }
            }

            return object;
        },
        createStoreInterface: function createStoreInterface(dispatcher, method) {

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
                    area = new Area(this.getTitle());
                    value = area.get();
                    area = null;

                    if (value === area) {

                        regFunc = dispatcher.getRegistration(this.getTitle());

                        return regFunc.$$history.length && regFunc.$$history[0];
                    }

                    return typeof argument == 'string' && argument in value ? value[argument] : value;
                }

                if (method == 'destroy') {

                    var _title3 = void 0,
                        index = void 0;

                    if (_title3 in stores) {

                        delete stores[_title3];
                    }

                    area = new Area(this.getTitle());

                    area.del();

                    return area = _title3 = null;
                }

                if (method == 'disconnect') {

                    return dispatcher.unregister(this.getTitle());
                }

                if (method == 'hydrate') {

                    if (isNullOrUndefined(argument)) {
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
        },
        createActionInterface: function createActionInterface(dispatcher, vector) {

            if (!(vector instanceof Object)) {

                throw new TypeError('Invalid Action Creator Vector, expected [object] but found [' + (typeof vector === 'undefined' ? 'undefined' : _typeof(vector)) + ']');
            }

            return function (data, stateAspectKey) {

                // console.log('OUTER-FUNC: ', this.constructor.caller);

                var id = this.getId();

                var typesBitMask = 0;

                if (!isNullOrUndefined(dispatchRegistry[id])) {
                    dispatchRegistry[id].actionTypes.push(vector);
                }

                if (vector.actionDefinition instanceof Array) {

                    _each(vector.actionDefinition, function (definition) {

                        typesBitMask |= Number(Values.isOfType(definition, data));
                    });

                    if (!typesBitMask) {

                        throw new TypeError('Action Data Invalid for action: [' + String(vector.type) + ']');
                    }
                } else {
                    if (!Values.isOfType(vector.actionDefinition, data)) {

                        throw new TypeError('Action Data Invalid for action: [' + String(vector.type) + ']');
                    }
                }

                return dispatcher.signal({
                    source: id,
                    actionType: vector.type,
                    actionKey: stateAspectKey || null,
                    actionData: data
                });
            };
        },
        watchDispatcher: function watchDispatcher(callback) {

            var dispatcher = this.getInstance();

            dispatcher.watch(callback);
        },
        isAppStateAutoRehydrated: function isAppStateAutoRehydrated() {

            var dispatcher = this.getInstance();

            return dispatcher.getAutoRehydrationState();
        },
        mergeConfig: function mergeConfig(cfg, hub) {

            var dispatcher = this.getInstance();

            config = _extend(cfg, _defaultConfig);

            if (config.universalCoverage) {
                config.persistenceEnabled = true;
            }

            if (!config.runtime.spaMode) {

                if (typeof config.runtime.shutDownHref === 'string' && config.runtime.shutDownHref.length != 0) {

                    wind.onbeforeunload = $createBeforeTearDownCallback(config);

                    wind.onunload = $createTearDownCallback(hub);
                }
            } else {

                if (typeof config.runtime.shutDownHref === 'string' && config.runtime.shutDownHref.length != 0) {

                    if (win.addEventListener) {
                        document.documentElement.addEventListener('click', $createBeforeTearDownCallback(config), false);
                        document.addEventListener('click', $createTearDownCallback(hub), false);
                    } else {
                        document.documentElement.attachEvent('onclick', $createBeforeTearDownCallback(config));
                        document.attachEvent('onclick', $createTearDownCallback(hub), false);
                    }
                }
            }

            if (config.persistenceEnabled) {

                // prepare Origin 
                var _origin = getAppOriginForPersist(config),
                    _tag = generateTag(_origin);

                persistStore.setItem(_origin, _tag);

                enforceCoverage.$$origin = _origin;

                enforceCoverage.$$tag = _tag;

                coverageNotifier.$$canOmit = true;

                coverageNotifier.$$tag = _tag;

                hub.onDispatch(coverageNotifier);
            }

            dispatcher.initCatchers(config);

            return config;
        },
        purgePersistStore: function purgePersistStore() {

            var _origin = getAppOriginForPersist(config);

            var _tag = generateTag(_origin);

            persistStore.removeItem(_origin);

            persistStore.removeItem(_tag);
        },
        registerAction: function registerAction() {
            /* creates hex value e.g. '0ef352ab287f1' */
            var regId = Math.random().toString(16).substr(2, 13);

            dispatchRegistry[regId] = { actionTypes: [] };

            return regId;
        },
        makeAggregator: function makeAggregator() {

            return {
                notifyAllStores: function notifyAllStores() {
                    /*
                    */
                }
            };
        },
        setMiddlewareCallback: function setMiddlewareCallback(middlewareFunc) {

            var dispatcher = this.getInstance();

            // HERE: using this try/catch for control flow and not defensive programming
            try {

                dispatcher.getMiddleware();
            } catch (ex) {

                dispatcher.setMiddleware(middlewareFunc);
            } finally {}
        },
        setStoreObserver: function setStoreObserver(object, regFunc, defaultStateObj) {
            if (typeof regFunc !== "function") {
                return null;
            }

            var _proto = getObjectPrototype(object);
            var dispatcher = this.getInstance();
            var title = object.getTitle();
            var method = null;

            dispatcher.register(title, regFunc, defaultStateObj);

            var methods = ['setChangeListener', 'unsetChangeListener', 'getState', 'disconnect', 'getQuerySchema', 'canRedo', 'canUndo', 'swapCallback', 'undo', 'redo', 'hydrate', 'destroy'];

            for (var c = 0; c < methods.length; c++) {
                method = methods[c];
                _proto[method] = this.createStoreInterface(dispatcher, method);
            }
        }
    };
}.bind(undefined)(wind);

var Hub = function () {
    function Hub() {
        var _this11 = this;

        _classCallCheck(this, Hub);

        this.toString = function () {
            _newArrowCheck(this, _this11);

            return "[object RadixxHub]";
        }.bind(this);

        this.Helpers = {
            isEqual: function isEqual(former, latter) {
                if (former === latter) {
                    return true;
                }

                if ((typeof former === 'undefined' ? 'undefined' : _typeof(former)) !== 'object' || former === null || (typeof latter === 'undefined' ? 'undefined' : _typeof(latter)) !== 'object' || latter === null) {
                    return false;
                }

                var keysA = Object.keys(former);
                var keysB = Object.keys(latter);

                if (keysA.length !== keysB.length) {
                    return false;
                }

                // Test for A's keys different from B.
                var bHasOwnProperty = hasOwnProperty.bind(latter);
                for (var i = 0; i < keysA.length; i++) {
                    if (!bHasOwnProperty(keysA[i]) || former[keysA[i]] !== latter[keysA[i]]) {
                        return false;
                    }
                }
            }
        };

        this.Payload = {
            type: {
                "array": "array",
                "date": "date",
                "string": "string",
                "regexp": "regexp",
                "boolean": "boolean",
                "function": "function",
                "object": "object",
                "number": "number",
                "error": function error(value) {

                    return value instanceof Error || value instanceof TypeError;
                },
                "nullable": function nullable(value) {

                    return value === null || value === undefined;
                },

                "numeric": {
                    Int: function Int(value) {
                        return isFinite(value) && value === parseInt(value);
                    },
                    Float: function Float(value) {
                        return isFinite(value) && value === parseFloat(value);
                    }
                },
                "any": function any(value) {

                    return value !== null || value !== undefined;
                }
            }
        };
    }

    _createClass(Hub, [{
        key: 'onShutdown',
        value: function onShutdown(handler) {

            if (typeof handler === 'function') {

                _ping = handler;
            }
        }
    }, {
        key: 'purgePersistentStorage',
        value: function purgePersistentStorage() {

            Observable.purgePersistStore();
        }

        /*Hub.prototype.onError = function(handler){
        };*/

    }, {
        key: 'onDispatch',
        value: function onDispatch(handler) {

            if (typeof handler === 'function') {

                Observable.watchDispatcher(handler);
            }
        }
    }, {
        key: 'requestAggregator',
        value: function requestAggregator() {

            return Observable.makeAggregator();
        }
    }, {
        key: 'eachStore',
        value: function eachStore(callback) {

            return Observable.eachStore(callback, function (stores, key) {
                this.push(stores[key]);
            }, null);
        }
    }, {
        key: 'makeActionCreators',
        value: function makeActionCreators(vectors) {

            function _action(registrationId) {
                Action.apply(this, Slc.call(arguments));
            }

            var actionObject = new _action(Observable.registerAction()); // Observable.registerAction();

            return Observable.setActionVectors(actionObject, vectors);
        }
    }, {
        key: 'makeStore',
        value: function makeStore(dataTitle, registerCallback, defaultStateObj) {

            function _store() {
                Store.apply(this, Slc.call(arguments));
            }

            var storeObject = new _store(dataTitle);

            Observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

            return storeObject;
        }
    }, {
        key: 'attachMiddleware',
        value: function attachMiddleware(callback) {

            Observable.setMiddlewareCallback(callback);
        }
    }, {
        key: 'isAppStateAutoRehydrated',
        value: function isAppStateAutoRehydrated() {

            return Observable.isAppStateAutoRehydrated();
        }
    }, {
        key: 'configure',
        value: function configure(config) {

            Observable.mergeConfig(config, this);
        }
    }]);

    return Hub;
}();

Hub.prototype.constructor = Hub;

exports.default = new Hub();
