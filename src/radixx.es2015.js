
// 'use strict';  Can't [use strict] mode cos i wish to use {void 0}/{arguments.callee} for checks	

const Hop = ({}).hasOwnProperty;

const wind = window || this;
const __beforeunload = wind.onbeforeunload;
const __unload = wind.onunload;
let __hasDeactivated = false;

let _ping = appState => {

		return;
};

const _checkAndKillEventPropagation = event => {
	if(event.type === 'click'){
   		if(event.stopPropagation){
   			event.stopPropagation();
   		}else{
   			event.cancelBubble = true;
   		}
   	}
};

const $createBeforeTearDownCallback = config => e => {
    // @See: https://greatgonzo.net/i-know-what-you-did-on-beforeunload/

    /* 
         `lastActivatedNode` variable is used to track the DOM Node that last 
         had focus (or was clicked) just before the browser triggered the `beforeunload` event 
     */

    const lastActivatedNode = (window.currentFocusElement // Mobile Browsers [ Custom Property ]
                || e.explicitOriginalTarget // old/new Firefox
                    || (e.srcDocument && e.srcDocument.activeElement) // old Chrome/Safari
                        || (e.currentTarget && e.currentTarget.document.activeElement) // Sarafi/Chrome/Opera/IE
                            || e.srcElement
                                || e.target);

    const // if the "imaginary" user is logging out
    leaveMessage = "Are you sure you want to leave this page ?";

    const isLogoff = ((typeof lastActivatedNode.hasAttribute == 'function' && lastActivatedNode.hasAttribute('data-href') && lastActivatedNode.getAttribute('data-href').includes(config.runtime.shutDownHref)) 
                    || (('href' in lastActivatedNode) && (lastActivatedNode.href.includes(config.runtime.shutDownHref))));

    const __timeOutCallback = () => {
            
            __hasDeactivated = __timeOutCallback.lock;

    };

    // console.log('Node: '+ lastActivatedNode);

    __timeOutCallback.lock = __hasDeactivated = true;
    beforeUnloadTimer = setTimeout(__timeOutCallback, 0);

    if(isLogoff){ // IE/Firefox/Chrome 34+
        if(!!~e.type.indexOf('beforeunload')){
            e.returnValue = leaveMessage; 
        }else{
            _confirm = confirm(leaveMessage);
            if(!_confirm){
                _checkAndKillEventPropagation(e);
            }
        }
    }else{
        _checkAndKillEventPropagation(e);
    }

    /* if (isLogoff) isn't true, no beforeunload dialog is shown */
    return ((isLogoff) ?  ((__timeOutCallback.lock = false) || leaveMessage) : clearTimeout(beforeUnloadTimer));
};

const $createTearDownCallback = hub => e => {

    /*
        This seems to be the best way to setup the `unload` event 
        listener to ensure that the load event is always fired even if the page
        is loaded from the `bfcache` (Back-Forward-Cache) of the browser whenever
        the back and/or forward buttons are used for navigation instead of links.
        Registering it as a property of the `window` object sure works every time
    */

            if(!__hasDeactivated){

                setTimeout(() => {

                        const appstate = {};
                    
                        hub.eachStore((store, next) => {

                            const title = store.getTitle();

                            appstate[title] = store.getState(); 
                        
                            store.disconnect();
                            store.destroy();

                            next();

                        });

                        _ping.call(hub, appstate);

                        if(e.type != 'click'){
                            __unload(e);
                        }

                }, 0);
            }
    };

const _defaultConfig = {
		runtime:{
			spaMode:true, shutDownHref:''
		},
		persistenceEnabled:false,
		autoRehydrate:false,
		universalCoverage:false,
		localHostDev:false
};

const Slc = ([]).slice;

const Values = {
	typesMap:{
            "number":Number,
            "array":Array,
            "object":Object,
            "string":String,
            "boolean":Boolean,
            "date":Date,
	    	"regexp":RegExp,	
            "function":Function
	},
	isOfType(type, value) {
		
		var type = type.toLowerCase(); // hoisting
		
		if(typeof type === 'function'){
			
			return type(value);
		}

		else if(typeof type === 'string'
					&& (type in this.typesMap)){
			return (/^string|function$/.test(typeof value)) 
						|| (Object(value) instanceof this.typesMap[type]);
		}

		return false;
	}
};

const _each = (obj, iterator, context) => {
	
	if(context === undefined){

		context = null;
	}

	for(const prop in obj){
		if(Hop.call(obj, prop)){
			iterator.call(context, obj[prop], prop, obj);
		}
	}
};

const _extend = (source, dest) => {

	 const merge = {};

	 for(const prop in dest){
		if(Hop.call(dest, prop)){

			if(typeof dest[prop] === "object"
	 			&& dest[prop] !== null){
			 	merge[prop] = _extend(source[prop], dest[prop]);
			 }else if(source && Hop.call(source, prop)){
			 	merge[prop] = source[prop];
			 }else {
			 	merge[prop] = dest[prop];
			 }
		}
	 }

	return merge;
};

const _curry = (func, args, context) => function(){
    const _args = Slc.call(arguments);
    return func.apply(context, args.concat(_args)); 
};

Array.prototype.forEach = Array.prototype.forEach || function(fn, cxt){

		return _each(this, fn, cxt);
};

Array.prototype.reduceRight = Array.prototype.reduceRight || function(fn /* initialValue */){
    if(null === this || 'undefined' === typeof this){
		throw new TypeError('Array.prototype.reduce called on null or undefined');
	}

    if('function' !== typeof fn){
		throw new TypeError(`${callback} is not a function`);
	}

    const t = Object(this);
    const len = t.length >>> 0;
    let k = len - 1;
    let value;

    if(arguments.length >= 2){

		value = arguments[1];

	} else {

		while(k >= 0 && !(k in t)){
			k--;
		}

		if(k < 0){
			throw new TypeError('Reduce of empty array with no initial value')
		}

		value = t[k--];
	}

    for(; k >= 0; k--){
		if(k in t){
			value = callback(value, t[k], k, t);
		}
	}
    return value;
};

Function.prototype.bind = Function.prototype.bind || function(cxt /* ,args... */){

		return _curry(this, [].slice(arguments, 1), cxt); 
}

/**
    Though IE 9 to IE 11 supports the CustomEvent constructor, IE throws an error {Object doesn't support this action} 
    whenever it's used. This weird behaviour is fixed below
    See: https://stackoverflow.com/questions/14358599/object-doesnt-support-this-action-ie9-with-customevent-initialization
*/

;(((w, d) => {
    function CEvent ( event, params ) {
        let t;
        let evt;
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        try{
		    evt = d.createEvent( 'CustomEvent' );
		    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		}catch(e){
		    evt = d.createEventObject(w.event);
			evt.cancelBubble = !params.bubbles;
                        evt.returnValue = !params.cancelable;
			if(typeof params.detail === "object"){
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
      const ce = new w.CustomEvent('test');
    } catch(e) {

        CEvent.prototype = Object.create(((w.Event && w.Event.prototype) || {}));
        w.CustomEvent = null;
        w.CustomEvent = CEvent;
    }
}))(wind, wind.document);

Object.create = Object.create || ((o, props) => {
    if (o === null || !(o instanceof Object)) {
		throw TypeError("Object.create called on null or non-object argument");
	}

    let prop;
    function F(){}
    F.prototype = o;

    if(typeof props === "object"){
		for(prop in props){
			if(Hop.call(props, prop)){
				F[prop] = props[prop];
			}
		}
	}

    return new F();
});

Object.keys = Object.keys || (fu => {
    if (typeof (fu) != 'object' 
    	&& typeof (fu) != 'function') {
           return;
    }

    const j = [];
    for (const k in fuc) {
          if(Hop.call(fuc, k)) {
                j.push(k)
          }
    }
    const l = !ob.propertyIsEnumerable('toString');

    const m = [
            'toString', 
            'toLocaleString', 
            'valueOf', 
            'hasOwnProperty', 
            'isPrototypeOf', 
            'prototypeIsEnumerable', 
            'constructor'
        ];

    if(l) {
        for (const o of m) {
            if(Hop.call(fuc, o)) {
                 j.push(o);
            }
        }
    }
    return j;
});

// Store constructor
const Store = ((() => {

	const requirementTypes = ['graph-ql', 'rest'];

	const serviceRequirementsMap = {};
	
	return function(title){

		const that = this;

		this.getTitle = () => title;

		this.toJSON = () => ({
            title
        });

		this.makeTrait = function(callback){

			const argsLeft = Slc.call(arguments, 1);

			if(typeof callback === 'function'){

				argsLeft.unshift(this);

				return callback(...argsLeft);
			}

			return null;

		};

		this.toString = () => "[object RadixxStore]";
	}	

})());

const // Action constructor 
Action = ((() => function(id){

    this.getId = () => id;

    this.toJSON = () => ({
        id
    });

    this.toString = () => "[object RadixxActionCreator]";
})());

const futuresStates = {
     STARTED:0,
     AWAIT:1,
     RESOLVED:2,
     REJECTED:3
};

const formatOptions = opts => {
     const options = {}, _opts = String(opts).split(",");
     _opts.forEach(key => {
           options[key] = true;
     });
     options.savedData = !1;
     return options;
};

const Routines = opts => {
    const options = formatOptions(opts);
    let fireStart;
    let fireEnd;
    let index;
    let fired;
    let firing;
    let pending = [];
    let queue = options.multiple && [];

    const fire = data => {
          options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
          fired = true;
          firing = true; // firing has begun!
          index = fireStart || 0;
          fireEnd = pending.length;
          for(fireStart = 0; index < fireEnd; index++){
                 // @TODO: need to curry args instead of directly binding them #DONE
               setTimeout(_curry(pending[index], data[1], data[0])/*.bind(data[0], data[1])*/, 20); // fire asynchronously (Promises/A+ spec requirement)
          }
          firing = false; // firing has ended!

          if(queue){ // deal with the queue if it exists and has any contents...
              if(queue.length){
                  return fire(queue.shift()); // fire on the {queue} items recursively
              }
               // if queue is empty.... then end [flow of control] at this point!
          }

          fire.$decline = false;
          
          if(options.savedData){
             if(options.unpack){
                 // clear our {pending} list and free up some memeory!!
                 pending.length = 0; // saves the reference {pending} and does not replace it!
             }
          }
 };

    return {
    add() {
        let len = 0;
        if(pending){ // if not disbaled
            
            const start = pending.length;
            (function add(args){
             
                   args.forEach(arg => {
				          const type = typeof arg;
                          
                          if(type == "function"){
                             len = pending.push(arg);
                          }else{
                             if(!!arg && arg.length && typeof arg != "string"){
                             	 // inspect recursively
                                 add(Slc.call(arg)); 
                             }
                          }
                   });
             
             }(Slc.call(arguments)));
            
            
			if( fired ){ // if we have already run the {pending} list of routines at least once, ...
				   if(options.join){
					  fireStart = start; 
					  fireEnd = len; // update info again...
					  fire.$decline = true;
					  fire( options.savedData ); // fire with the saved data 
					  this.disable();
					  
				   }  
			}
            
            
        }
        return len;
    },
    hasFn(fn) {
	    let result = false;
        _each(pending, val => {
		     if(typeof fn === "function" && fn === val)
			      result = true;
		}, this);
		return result;
    },
    hasList() {
        return !!pending; // [false] only when the disabled(); method has been called!!
    },
    fireWith() /* context, args */{
        if(pending && (!fired || queue)){
            const args = arguments.length && Slc.call(arguments) || [null, 0];
            
            if(firing){ // we are currently iterating on the {pending} list of routines
                queue.push( args ); // queue assets for recursive firing within {fire} function later
            }else{
                fire( args );
            }
        }
    },
    disable() {
	    if(!options.savedData){
             pending = queue = undefined;
	    }
    }
  };
};

const // Futures constructor - Promises/A+ Spec Implementation (Influenced by jQuery though...)
Futures = function(){
    const defTracks = {
        resolve:['done', 'RESOLVED', Routines(['join', 'save'])],
        reject:['fail', 'REJECTED', Routines(['join','save'])],
        notify:['progress', 'AWAIT', Routines(['join', 'multiple'])]
    };

    const self = this;
    let keys = Object.keys(defTracks);

    let setter = (fnName, arr, forPromise) => {
        const drop = (fnName != "notify");
        if(!arr.length && !forPromise) return defTracks[fnName][2].fireWith;
        return (!forPromise)? function(){
            if(self.state >= 0 && self.state <=1){
                self.state = futuresStates[defTracks[fnName][1]];
            }

            defTracks[fnName][2].fireWith(self === this? self : this, [].slice.call(arguments));

            if(drop){
			    defTracks[arr[0]][2].disable();
                defTracks[arr[1]][2].disable();
			    switch(fnName){	
				   case "reject":
				   case "resolve":
				      self.state = futuresStates[defTracks[fnName][1]];
				   break;
			    }	
			}
            return true;
        } : function(){
            if(self.state >= 0 && self.state <=1){
                defTracks[fnName][2].add.apply(self, Slc.call(arguments));
            }
            return self;
        } ;
    };

    let i = 0;
    let ax = keys.slice();
    let d;
    const promise = {};


    // using a closure to define all the functions on the fly...

    for(d in defTracks){
        if(Hop.call(defTracks, d)){
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[`${d}With`] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }

    promise.state = futuresStates.STARTED;

    promise.always = function(){
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };

    promise.promise = obj => {
        if(obj && typeof obj == "object" && !obj.length){
            for(const i in promise){
                if(Hop.call(promise, i)){
                    obj[i] = promise[i];
                }
            }
            return obj;
        }
        return promise;
    };

    promise.then = function(/* fnDone, fnFail, fnProgress */){
        let ret;
        const args = [].slice.call(arguments);
        args.forEach((item, i) => {
                     item = (typeof item == "function") && item;
                     self[defTracks[keys[i]][0]](function(){
							let rt;
							try{ 
								/*
									Promises/A+ specifies that errors should be contained
									and returned as value of rejected promise
								*/
							   rt = item && item.apply(this, arguments);
							}catch(e){ 
							   rt = this.reject(e);
							}finally{
							   if(rt && typeof rt.promise == "function")
							        ret = rt.promise();						   
							}	   
                     });
        });
        return self.promise(ret);
    };

    promise.isResolved = () => !defTracks['reject'][2].hasList();
    promise.isRejected = () => !defTracks['resolve'][2].hasList();
    promise.pipe = promise.then;

    promise.promise(self);

    Futures.STARTED = futuresStates.STARTED;
    Futures.AWAITING = futuresStates.AWAIT;
    Futures.RESOLVED = futuresStates.RESOLVED;
    Futures.REJECTED = futuresStates.REJECTED;

    /* avoid leaking memory with each call to Futures constructor!! */
    setter = ax = d = i = null;

    /* enforce {new} on constructor */
    return (self instanceof Futures)? self : new Futures();
};

const Observable = ((win => {
    let $instance = null;
    const persistStore = (win.top !== win || !win.localStorage) ? null : win.localStorage;
    const sessStore = (win.top !== win || !win.sessionStorage ? (win.opera && !(Hop.call(win, 'opera')) ? win.opera.scriptStorage : {} ) : win.sessionStorage);
    const mode = win.document.documentMode || 0;
    let autoRehydrationOccured = false;

    let config = {

};

    const watchers = [

];

    const stores = {

};

    const storeKeys = [

];

    const observers = {

};

    const _promises = {

};

    const waitQueue = [

];

    const dispatchRegistry = {
    
};

    const cachedStorageKeys = {

};

    const getObjectPrototype = obj => {
		if('getPrototypeOf' in Object){
			return Object.getPrototypeOf(obj);
		}else if('__proto__' in obj){
			if(!(Hop.call(obj, '__proto__'))){	
				return (obj.__proto__);
			}
		}else if('constructor' in obj){
			if(!(Hop.call(obj, 'constructor'))){	
				return obj.constructor.prototype;
			}
		}
		return obj;
	};

    const isNullOrUndefined = obj => obj == void 0;

    const triggerEvt = (target, eType, detail, globale) => {
        const evt = new CustomEvent(eType, {
                            detail,
                            cancelable:true,
                            bubbles:false
            }); // a stub function - just in case

        let dispatch = () => false;

        if((!('target' in evt)) 
                && evt.cancelBubble === true){

            target.setCapture(true);
        }

        // set up cross-browser dispatch method.
        dispatch = target[ (!('target' in evt) ? "fireEvent" : "dispatchEvent") ];

        // Including support for IE 8 here ;)
        return dispatch.apply(target, (!('target' in evt) ? [`on${eType}`, evt ] : [ evt ]));
    };

    const operationOnStoreSignal = (fn, queueing, area, action) => { 

	    // first, retrieve the very first state data and cache it
	    if(fn.$$history.length == 1 
		&& (!fn.$$initData)){

	 		fn.$$initData = fn.$$history[0];
	    }		

	    // second, make sure that there is no future state to forth on	
	    fn.$$history = fn.$$history.slice(0, fn.$$historyIndex + 1);
	    
	    // lets setup a place to store new state, also mark out the context of this call
	    let newStoreState = false, len, _key;

	    // create a new state of the store data by applying a given
	    // store callback function to the current history head

	    if(queueing === null){

	    	if(action !== null){

		    	newStoreState = action.actionData;

		    }else{

		    	newStoreState = fn.$$history[fn.$$historyIndex];
		    }

		    coverageNotifier.$$historyLocation = fn.$$historyIndex;

	    }else{
	    	
	    	newStoreState = fn.call(queueing, action, area.get());

	    	coverageNotifier.$$historyLocation = null;

	    }

		if(typeof newStoreState == 'boolean'
			|| newStoreState == undefined){
			
			throw new TypeError("Radixx: Application State unavailable after signal to Dispatcher");		

			return;
		}

		_key = area.put(newStoreState);

		coverageNotifier.$$currentStoreTitle = _key;
	    
	    if(action !== null){

	    	if(action.source !== 'hydrate'){
    				;
	    	}

	    	triggerEvt(
					win.document, 
					'storesignal', 
					{
						url:win.location.href,
						key:_key,
						newValue:newStoreState,
						source:win,
						aspect:action.actionKey,
						type:action.actionType
					}, 
					win
			);

	    	coverageNotifier.$$withAction = true;

		    // add the new state to the history list and increment
		    // the index to match in place
		    len = fn.$$history.push(newStoreState); /* @TODO: use {action.actionType} as operation Annotation */
		    
		    fn.$$historyIndex++;

		    if(fn.$$history.length > 21){ // can't undo/redo (either way) more than 21 moves at any time

		  		fn.$$history.unshift();
		    }

	    }else{

	    	return newStoreState;
    	}
	   
	};

    const getAppOriginForPersist = cfg => String(location.origin + (cfg.localHostDev? ':'+document.documentElement.id : ''));

    const generateTag = origin => {

		const _cdata = persistStore.getItem(origin);
		
		if(!isNullOrUndefined(_cdata)){

			return getNormalized(_cdata);
		}

		return String(Math.random()).replace('.','x_').substring(0, 11);
	};

    const getNormalized = val => {

	   	if(isNullOrUndefined(val) || val === "null")
	   		 return null;

		try{
			return JSON.parse(val);
		}catch(e){
			return String(val);
		}
	};

    const setNormalized = val => {

	   	if(isNullOrUndefined(val)) 
	   		val = null;

		try{
			return JSON.stringify(val);
		}catch(e){

			return String(val);
		}
	};

    const setAppState = appState => {

		_each(appState, (isolatedState, storeTitle) => {

			const area = new Area(storeTitle);

			area.put(isolatedState);
		});

		fireWatchers(appState, true);
	};

    const getAppState = () => {
        const appStateData = {};
        let key;
        let indexStart;
        let indexEnd;
        let values;
        let _data;

        if(('key' in sessStore) 
                && (typeof sessStore.key == 'function')){

            // We iterate this way so we can support IE 8 + other browsers
            for(var i=0; i < sessStore.length; i++){
                key = sessStore.key(i);
                _data = sessStore.getItem(key);
                
                if(!_data){
                    ;
                }

                appStateData[key] = getNormalized(_data) || null;
            }
        }else{
        
        
            for(var i = 0; i < storeKeys.length; i++){
                
                key = storeKeys[i];
                
                if(cachedStorageKeys[key]){

                    indexStart = win.name.indexOf(key);

                    indexEnd = win.name.indexOf('|', indexStart);

                    values = (win.name.substring(indexStart, indexEnd)).split(':=:') || ["", null];

                    _data = values[1];

                }

                appStateData[key] = getNormalized(_data) || null;
            }
        }

        return appStateData;
    };

    const Area = function(key){

		this.put = value => {
            /* 
				In IE 8-9, writing to sessionStorage is done asynchronously (other browsers write synchronously)
				we need to fix this by using IE proprietary methods 
				See: https://www.nczonline.net/blog/2009/07/21/introduction-to-sessionstorage/ 
			*/

            let indexStart;

            let indexEnd;
            const isIE8Storage = ('remainingSpace' in sessStore) && (mode === 8);

            // Detecting IE 8 to enable forced sync
            if(isIE8Storage){
				if(typeof sessStore.begin == 'function'){
					sessStore.begin();
				}
			}

            try{

				sessStore.setItem(key, setNormalized(value));
				
			}catch(e){
				
				/* This is a fallback to support Opera Mini 4.4+ on Mobile */
				
				if(cachedStorageKeys[key]){
					// we're in overwrite mode, so clear `key` out and push in update (below)
					indexStart = win.name.indexOf(key);
					
					indexEnd = win.name.indexOf('|', indexStart);

					win.name = win.name.replace(win.name.substring(indexStart, indexEnd), '');
				}

				if(win.name === ""){

					win.name = `${key}:=:${setNormalized(value)}|`;

				}else{

					win.name += `${key}:=:${setNormalized(value)}|`;

				}
				
				cachedStorageKeys[key] = 1;
			}

            if(isIE8Storage){
				if(typeof sessStore.commit == 'function'){
					sessStore.commit();
				}
			}

            return key;
        };

		this.get = () => {

			let indexStart, indexEnd, values;
			
			/* This is a fallback to support Opera Mini 4.4+ on Mobile */
			
			if(cachedStorageKeys[key]){

				indexStart = win.name.indexOf(key);

				indexEnd = win.name.indexOf('|', indexStart);

				values = (win.name.substring(indexStart, indexEnd)).split(':=:') || [0, 0];

				return getNormalized(values[1]) || null;
			}else{

				return getNormalized(sessStore.getItem(key)) || null;
			}
		};

		this.del = () => {

				let indexStart, indexEnd;
				/* This is a fallback to support Opera Mini 4.4+ on Mobile */
			
				if(cachedStorageKeys[key]){
					
					// we're in delete mode
					indexStart = win.name.indexOf(key);
					
					indexEnd = win.name.indexOf('|', indexStart);

					win.name = win.name.replace(win.name.substring(indexStart, indexEnd), '');
				}else{
					
					return sessStore.removeItem(key);
				}
		};

		return this;
	};

    const getCurrentActionOnStack = () => {

		const actionStack = operationOnStoreSignal.$$redoActionsStack;

		if(actionStack.lenth){
			return actionStack[actionStack.length - 1];
		}

		return null;
	};

    const coverageNotifier = function(appState){
        let currentAction = null;
        const _tag = coverageNotifier.$$tag;

        if(arguments.callee.$$withAction === true){
			currentAction = getCurrentActionOnStack();
			arguments.callee.$$withAction = null;
		}

        if(!isNullOrUndefined(_tag)
			&& (persistStore !== null)){

			persistStore.setItem(_tag, setNormalized({
						state:appState, 
						action:currentAction,
						title:arguments.callee.$$currentStoreTitle, 
						historyLoc:arguments.callee.$$historyLocation
			}));

			arguments.callee.$$historyLocation = null;
		}
    };

    const fireWatchers = (state, omitCallback) => {

		let pos, watcher;

		for(pos in watchers){
			if(Hop.call(watchers, pos)){
				watcher = watchers[pos];
				if(omitCallback){
					if(watcher.$$canOmit){
						continue;
					};
				}
				watcher.call(null, state);
			}
		}
	};

    handlePromises = () => {
        let promise = null;
        const state = getAppState();

        for(const title in _promises){
			if(Hop.call(_promises, title)){
				promise = _promises[title];
				if(!promise.isResolved()){
					promise.resolve();
				}
				delete _promises[title];
			}
		}

        waitQueue.length = 0;

        fireWatchers(state);
    },

	enforceCoverage = function(e){
        const _origin = arguments.callee.$$origin;
        const _tag = arguments.callee.$$tag;
        let _action = null;
        let _state = null;
        let _title = null;
        let _hloc = null;
        let _composedData = null;
        let observer = null;

        // Detecting IE 8 to apply mild hack on event object
        if(('remainingSpace' in sessStore)){
			e.key = e.detail.key;
		}

        if(!persistStore
			|| _origin === e.key){ // if we can't find the key in the array `storeKeys`
			return;
		}

        _composedData = getNormalized(persistStore.getItem(_tag));

        if(_tag === e.key
			&& isNullOrUndefined(_composedData)){
			return;
		}

        _state = _composedData.state;

        _action = _composedData.action;

        _title = _composedData.title;

        _hloc = parseInt(_composedData.historyLoc);

        if(_action !== null){
			operationOnStoreSignal.$$redoActionsStack.push(_action);
		}

        if(_hloc !== null){
			observer = observers[_title];
			if(observer){
				observer.$$historyIndex = _hloc;
				if(_hloc === -1){
					observer.$$history.length = 0;
				}
			}
		}

        if(_state){
			setTimeout(
				setAppState.bind(null, _state)
			, 0); 
		}
    },

	stateWatcher = e => {

		e = e || win.event;

		if(storeKeys.includes(e.detail.key)){
            const storeTitle = e.detail.key;
            let listeners;

            if(!isNullOrUndefined(observers[storeTitle])){

				listeners = observers[storeTitle].$$store_listeners;

				for(let t=0; t < listeners.length; t++){
						    			
					listeners[t].call(stores[storeTitle], e.detail.type, e.detail.aspect);
						    
				}
			}
        }
	};

    class Dispatcher {
        constructor() {

            this.middlewares = [];

            operationOnStoreSignal.$$undoActionsStack = [];

            operationOnStoreSignal.$$redoActionsStack = [];
        }

        updateAutoRehydrationState() {
            autoRehydrationOccured = true;
        }

        getAutoRehydrationState() {
            return autoRehydrationOccured;
        }

        setMiddleware(middleware) {
            
                if(typeof middleware === 'function'
                    /*&& (middleware.length >= 2)*/){

                    return this.middlewares.push(middleware);
                }

                throw new Error("Radixx: Inavlid Middleware Callback - Must be a Function with Parameters ( >= 2 )");

        }

        hasMiddleware() {
            
                return (this.middlewares.length > 0);

        }

        initCatchers(config) {

                if(config.autoRehydrate){
                    if(!isNullOrUndefined(enforceCoverage.$$tag) 
                        && persistStore)
                    const data = getNormalized(persistStore.getItem(enforceCoverage.$$tag));
                    if(data instanceof Object 
                            && data.state){
                        setAppState(data.state);
                        this.updateAutoRehydrationState();
                    }
                }

                if(win.document.addEventListener){
                    /* IE 9+, W3C browsers all expect the 'storage' event to be bound to the window */
                    if(config.universalCoverage){
                        win.addEventListener('storage', enforceCoverage, false);
                    }

                    win.document.addEventListener('storesignal', stateWatcher, false);
                }else if(win.document.attachEvent){
                    /* IE 8 expects the 'storage' event handler to be bound to the document 
                        and not to the window */
                    if(config.universalCoverage){
                        win.document.attachEvent('onstorage', enforceCoverage);
                    }

                    win.document.attachEvent('onstoresignal', stateWatcher);
                }

        }

        getRegistration(title) {

            if(Hop.call(observers, title)){
                
                return observers[title];
            }

            return {};
        }

        register(title, observer, defaultStoreContainer) {
                
                if(Hop.call(observers, title)){
                    
                    if('$$history' in observers[title]
                         && typeof observer.$$history == 'undefined'){
                        if(!stores[title]){ // If the store doesn't have any change listeners registered
                            
                            throw new Error("Radixx: Cannot Overwrite existing store registration");
                        
                            return;
                        }

                        observer.$$history = observers[title].$$history;
                        observer.$$historyIndex = observers[title].$$historyIndex;
                        observer.$$store_listeners = observers[title].$$store_listeners;
                        observers[title] = observer;
                    }
                }else{

                    observer.$$store_listeners = [];
                    observer.$$history = [(
                            !!defaultStoreContainer ? 
                            defaultStoreContainer :
                                 []
                    )];
                    observer.$$historyIndex = 0;
                    observers[title] = observer;
                    storeKeys.push(title);
                }
                
                return true;
        }

        watch(callback) {

                watchers.push(callback);
        }

        setStoreListener(store, callback) {

            const title = store.getTitle();

            if(!isNullOrUndefined(observers[title])){
                if(typeof callback == "function"){
                    stores[title] = store;
                    observers[title].$$store_listeners.push(callback);
                }
            }
        }

        unsetStoreListener(store, callback) {

            const title = store.getTitle();

            if(!isNullOrUndefined(observers[title])){
                if(typeof callback == "function"){
                    const pos = observers[title].$$store_listeners.indexOf(callback);
                    observers[title].$$store_listeners.splice(pos, 1);
                }
            }

        }

        signalUnique(hydrateAction) {

            if(hydrateAction.source != 'hydrate'){
                return;
            }

            // Pass this on to the event queue [await]
            win.setTimeout(handlePromises, 0);

            const stateArea = new Area(hydrateAction.target), regFunc = observers[hydrateAction.target];

            operationOnStoreSignal.$$redoActionsStack.length = 0;

            operationOnStoreSignal.$$redoActionsStack.push(hydrateAction);

            regFunc.$$history.length = 0; // clear out the store state since this is a hydrate call

            regFunc.historyIndex = -1;

            operationOnStoreSignal(...[
				regFunc, 
				null, 
				stateArea,
				hydrateAction
			]);

        }

        handleStoreMutation(store, mutationType) {

            if(!mutationType){
                return;
            }

            const storeTitle = store.getTitle(), isolatedState = {}, regFunc = this.getRegistration(storeTitle), stateArea = new Area(storeTitle);

                switch(mutationType){

                    case 'undo':
                        if(store.canUndo()){
                            
                            --regFunc.$$historyIndex;

                            isolatedState[storeTitle] = operationOnStoreSignal(...[
								regFunc,
								null,
								stateArea,
								null
							]); 

                            // Pass this on to the event queue 
                            win.setTimeout(fireWatchers.bind(null, isolatedState), 0);

                            return true;
                        }
                    break;
                    case 'redo':
                        if(store.canRedo()){

                            ++regFunc.$$historyIndex;

                            isolatedState[storeTitle] = operationOnStoreSignal(...[
								regFunc,
								null,
								stateArea,
								null
							]);

                            // Pass this on to the event queue 
                            win.setTimeout(fireWatchers.bind(null, isolatedState), 0);

                            return true;

                        }
                    break;
                }

                return false;
        }

        rebuildStateFromActions() {

            const actionsStack = operationOnStoreSignal.$$redoActionsStack;

            _each(actionsStack, (action, index) => {

                let stateArea;

                for(title in observers){
                    if(Hop.call(observers, title)){

                        stateArea = new Area(title);

                        observers[title].call(action, stateArea.get());
                    }
                }

            }, operationOnStoreSignal);
        }

        signal(action) {
            let compactedFunc = null;

            const // this is the function that does the actual dispatch of the 
            baseDispatcher = (observers, dispatcher, action, prevState) => {

					let title, stateArea = null; 

					operationOnStoreSignal.$$redoActionsStack.push(action);

					for(title in observers){
						if(Hop.call(observers, title)){

							stateArea = new Area(title);
							operationOnStoreSignal(...[
                                observers[title], 
                                dispatcher.queueing, 
                                stateArea,
                                action
                            ]);
						}	
					}

					return getAppState();
		};

            const boundBaseDispatcher = baseDispatcher.bind(null, observers, this);

            const adjoiner = {
                    /*createActionObject:function(_data, _type){
                         
                         return {
                            source:"",
                            actionType:_type,
                            actionData:_data,
                            actionKey:null
                         };
                    },*/
                    createDispatchResolver(_action) {

                        return boundBaseDispatcher.bind(null, _action);
                    }
            };

            const _hasMiddleware = this.hasMiddleware();


            // Some validation - just to make sure everything is okay
            if(!(action.source in dispatchRegistry)){

                return;
            }

            // determine if there are middleware callbacks registered
            if(_hasMiddleware){ 
                
                // collapse all middleware callbacks into a single callback
                compactedFunc = this.middlewares.concat(
                                    boundBaseDispatcher
                                ).reduceRight((bound, middleware) => middleware.bind(null,
                    bound
                ));

            }else {

                compactedFunc = boundBaseDispatcher;
            }

            // Pass this on to the event queue 
            win.setTimeout(handlePromises, 0);

            // begin cascading calls to the middlewares in turn
            // from the last attached middleware all the way up
            // to the first middleware until the action
            // is finally dispatched

            if(!isNullOrUndefined(compactedFunc)){

                compactedFunc.apply(_hasMiddleware ? adjoiner : null, [action, getAppState()]);

            }
        }

        unregister(title) {

            let observer, store, index;

            if(!isNullOrUndefined(observers[title])){
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

                if(index != -1){
                    storeKeys.splice(index, 1);
                }
            }
        }
    }

    Dispatcher.prototype.queueing = {
		await(titleList, callback) {
            let current = -1;
            const len = (titleList.length + current);
            let promise = null;

            while(++current < len){
				if(waitQueue.includes(titleList[current])){
					promise = _promises[titleList[current]];
				}else{
					promise = _promises[titleList[current]] = new Futures();
				}
				
				if(typeof callback == "function"){
					promise.then(callback);
				}
			}
        }
	};

    return {

		getInstance() {
			
			if($instance === null){

				$instance = new Dispatcher();
			}

			return $instance;

		},
		eachStore(fn, extractor, storeArray) {
            _each(storeKeys, extractor.bind((storeArray = []), stores));

            let callable = fn;
            let prevIndex = storeArray.length - 1;

            const next = () => {
			
				let returnVal;

				if(prevIndex >= 0){	
					returnVal = Boolean(
						callable.call(
								null, 
								storeArray[prevIndex--], 
								next
						)
					);
				}else{
					callable = !0;
					returnVal = callable;
				}

				return returnVal;
			};

            next();
        },
		setActionVectors(object, vectors) {
            const _proto = getObjectPrototype(object);
            const dispatcher = this.getInstance();
            let vector = null;

            for(const creator in vectors){
				if(Hop.call(vectors, creator)){
				     vector = vectors[creator];	
				     _proto[creator] = this.createActionInterface(dispatcher, vector);
				}
			}

            return object;
        },
		createStoreInterface(dispatcher, method) {
			

			return function(){
                let regFunc;
                let area;
                const argument = arguments.length? arguments[0] : null;

                if(method == 'setChangeListener'){

					return dispatcher.setStoreListener(this, argument);
				}

                if(method == 'unsetChangeListener'){

					return dispatcher.unsetStoreListener(this, argument);
				}

                if(method == 'getState'){

					let value;
					area = new Area(this.getTitle());
					value = area.get();
					area = null;

					if(value === area){

						regFunc = dispatcher.getRegistration(this.getTitle());

						return (regFunc.$$history.length && regFunc.$$history[0]);
					}

					return  (typeof argument == 'string' && (argument in value)) ? value[argument] : value;
				}

                if(method == 'destroy'){

					let title, index;

					if(title in stores){
						
						delete stores[title];

					}

					area = new Area(this.getTitle());

					area.del();

					return (area = title = null);
				}

                if(method == 'disconnect'){

					return dispatcher.unregister(this.getTitle());
				}

                if(method == 'hydrate'){

					if(isNullOrUndefined(argument)){
						return;
					}

					return dispatcher.signalUnique({
						source:method,
						target:this.getTitle(),
						actionData:argument
					});
				}

                if(method == 'getQuerySchema'){
					
					return {};
				}

                if(method == 'setQuerySchema'){

					return true;
				}

                if(method == 'canUndo'){

					regFunc = dispatcher.getRegistration(this.getTitle());

					return (regFunc.$$historyIndex != 0);
				}

                if(method == 'swapCallback'){

					return dispatcher.register(this.getTitle(), argument);
				}

                if(method == 'canRedo'){
					
					regFunc = dispatcher.getRegistration(this.getTitle());

					return (regFunc.$$historyIndex !== regFunc.$$history.length - 1);
				}

                if(method == 'undo'){

					return dispatcher.handleStoreMutation(this, method);
											
				}

                if(method == 'redo'){

					return dispatcher.handleStoreMutation(this, method);

				}
            }
			
		},
		createActionInterface(dispatcher, vector) {
			
			if(!(vector instanceof Object)){

				throw new TypeError(`Invalid Action Creator Vector, expected [object] but found [${typeof(vector)}]`);
			}

			return function(data, stateAspectKey){

				 // console.log('OUTER-FUNC: ', this.constructor.caller);

				const id = this.getId();

				if(!isNullOrUndefined(dispatchRegistry[id])){
					dispatchRegistry[id].actionTypes.push(
						vector
					);
				}

				if(vector.actionDefinition){
					if(!Values.isOfType(vector.actionDefinition, data)){
						
						throw new TypeError(`Action Data Invalid for action: [${vector.type}]`);

					}	
				}
				
				return dispatcher.signal({
					source:id,
					actionType:vector.type,
					actionKey:stateAspectKey || null,
					actionData:data
				});
			}
		},
		watchDispatcher(callback) {

			const dispatcher = this.getInstance();

			dispatcher.watch(callback);
					
		},
		isAppStateAutoRehydrated() {

			const dispatcher = this.getInstance();

			return dispatcher.getAutoRehydrationState();
		},
		mergeConfig(cfg, hub) {

			const dispatcher = this.getInstance();

		 	config = _extend(cfg, _defaultConfig);

		 	if(config.universalCoverage){
		 		config.persistenceEnabled = true;
		 	}

			if(!config.runtime.spaMode){
				
				if(typeof config.runtime.shutDownHref === 'string'
					&& config.runtime.shutDownHref.length != 0){

					wind.onbeforeunload = $createBeforeTearDownCallback(config);
				
					wind.onunload = $createTearDownCallback(hub);
				}
			}else{

				if(typeof config.runtime.shutDownHref === 'string'
					&& config.runtime.shutDownHref.length != 0){

					if(win.addEventListener){
						document.documentElement.addEventListener('click', $createBeforeTearDownCallback(config), false);
						document.addEventListener('click', $createTearDownCallback(hub), false);
					}else{
						document.documentElement.attachEvent('onclick', $createBeforeTearDownCallback(config));
						document.attachEvent('onclick', $createTearDownCallback(hub), false);
					}
				}
			}

			if(config.persistenceEnabled){

				// prepare Origin 
				const _origin = getAppOriginForPersist(config), _tag = generateTag(_origin);

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
		purgePersistStore() {

			const _origin = getAppOriginForPersist(config);

			const _tag = generateTag(_origin);

			persistStore.removeItem(_origin);

			persistStore.removeItem(_tag);

		},
		registerAction() {
			/* creates hex value e.g. '0ef352ab287f1' */
			const regId = Math.random().toString(16).substr(2, 13); 
	
			dispatchRegistry[regId] = {actionTypes:[]};

			return regId;

		},
		makeAggregator() {

				return {
					notifyAllStores() {
						/*
						*/
					}
				};
		},
		setMiddlewareCallback(middlewareFunc) {

			const dispatcher = this.getInstance();

			// HERE: using this try/catch for control flow and not defensive programming
			try{

				dispatcher.getMiddleware();

			}catch(ex){

				dispatcher.setMiddleware(
					middlewareFunc
				);

			}finally {

			}

		},
		setStoreObserver(object, regFunc, defaultStateObj) {
            if(typeof regFunc !== "function"){
				return null;
			}

            const _proto = getObjectPrototype(object);
            const dispatcher = this.getInstance();
            const title     = object.getTitle();
            let method = null;

            dispatcher.register(title, regFunc, defaultStateObj);

            const methods = ['setChangeListener', 'unsetChangeListener', 'getState', 'disconnect', 'getQuerySchema', 'canRedo', 'canUndo', 'swapCallback', 'undo', 'redo', 'hydrate', 'destroy'];

            for(let c=0; c < methods.length; c++){
				method = methods[c];
				_proto[method] = this.createStoreInterface(dispatcher, method);
			}
        } 
	};
})(wind));

class Hub {
    constructor() {

            this.toString = () => "[object RadixxHub]"

            this.Helpers = {
                isEqual(former, latter) {
                      if (former === latter) {
                        return true;
                      }

                      if (typeof former !== 'object' || former === null ||
                          typeof latter !== 'object' || latter === null) {
                        return false;
                      }

                      const keysA = Object.keys(former);
                      const keysB = Object.keys(latter);

                      if (keysA.length !== keysB.length) {
                        return false;
                      }

                      // Test for A's keys different from B.
                      const bHasOwnProperty = hasOwnProperty.bind(latter);
                      for (let i = 0; i < keysA.length; i++) {
                        if (!bHasOwnProperty(keysA[i]) || former[keysA[i]] !== latter[keysA[i]]) {
                          return false;
                        }
                      }
                }
            };

            this.Payload = {
                type:{
                     "array":"array",
                     "date":"date",
                     "string":"string",
                     "regexp":"regexp",
                     "boolean":"boolean",
                     "function":"function",
                     "object":"object",
                     "number":"number",
                     "error"(value) {

                            return (value instanceof Error || value instanceof TypeError);
                     },
                     "nullable"(value) {

                            return (value === null || value === undefined);
                     },
                     "numeric":{
                        Int(value) {
                            return isFinite(value) && (value === parseInt(value))
                        },
                        Float(value) {
                            return isFinite(value) && (value === parseFloat(value))
                        }
                     },
                     "any"(value) {
                            
                            return (value !== null || value !== undefined);	 			
                     }
                }
            };

    }

    onShutdown(handler) {

        if(typeof handler === 'function'){

            _ping = handler;
        }

    }

    purgePersistentStorage() {

        Observable.purgePersistStore();
    }

    /*Hub.prototype.onError = function(handler){
    };*/

    onDispatch(handler) {

        if(typeof handler === 'function'){

            Observable.watchDispatcher(handler);
        }

    }

    requestAggregator() {

        return Observable.makeAggregator();
    }

    eachStore(callback) {

        return Observable.eachStore(callback, function(stores, key){
                this.push(stores[key]);
        }, null);
    }

    makeActionCreators(vectors) {

        function _action(registrationId){
            Action.apply(this, Slc.call(arguments));
        }

        const actionObject = new _action(Observable.registerAction()); // Observable.registerAction();

        return Observable.setActionVectors(actionObject, vectors);
    }

    makeStore(dataTitle, registerCallback, defaultStateObj) {

        function _store(){
            Store.apply(this, Slc.call(arguments));
        }

        const storeObject = new _store(dataTitle);

        Observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

        return storeObject;
    }

    attachMiddleware(callback) {

        Observable.setMiddlewareCallback(callback);

    }

    isAppStateAutoRehydrated() {

        return Observable.isAppStateAutoRehydrated();
    }

    configure(config) {

        Observable.mergeConfig(config, this);

    }
}

Hub.prototype.constructor = Hub;

export default new Hub(

);
