 /*!
  * @lib: Radixx
  * @version: 0.1.0
  * @author: Ifeora Okechukwu
  * @created: 30/12/2016
  *
  * All Rights Reserved 2016 - 2018.
  * Use, reproduction, distribution, and modification of this code is subject to the terms and
  * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
  *
  * @desc: Implementation of Facebooks' Flux Architecture with a Twist.
  */

 !function(root, factory){

 	if(typeof module != "undefined" && !!(module.exports)){
 		if(root != void 0){
 			module.exports = factory(root);
 		}else{
 			module.exports = factory({});
 		}
 	}else if(typeof define != "undefined" && !!(define.amd)){
 		define("Radixx", function(){ return factory(root); });
 	}else{
 		root['Radixx'] = factory(root);
 	}

 }(this, function(wind, undefined){ 

// 'use strict';  Can't [use strict] mode cos i wish to use {void 0} to check nulled/undefined vars	

var Hop = ({}).hasOwnProperty,

__beforeunload = wind.onbeforeunload,

__unload = wind.onunload,

_tag = null,

_defaultConfig = {runtime:{spaMode:true,shutDownHref:''},persistenceEnabled:false},

Slc = ([]).slice,

Values = {
	typesMap:{
            "number":Number,
            "array":Array,
            "object":Object,
            "string":String,
            "date":Date,
	    	"regexp":RegExp,	
            "function":Function
	},
	isOfType:function(type, value){
		
		var type = type.toLowerCase();
		
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
},

_each = function (obj, iterator, context){
	
	if(context === undefined){

		context = null;
	}

	for(var prop in obj){
		if(Hop.call(obj, prop)){
			iterator.call(context, obj[prop], prop, obj);
		}
	}
},

_extend = function(source, dest){

	 var merge = {};

	 for(var prop in dest){
		if(Hop.call(dest, prop)){

			if(typeof dest[prop] === "object"
	 			&& dest[prop] !== null){
			 	return _extend(source[prop], dest[prop]);
			 }else if(Hop.call(source, prop)){
			 	merge[prop] = source[prop];
			 }else {
			 	merge[prop] = dest[prop];
			 }
		}
	 }

	return merge;
},

_ping = function(appState){

		return;
},

_curry = function (func, args, context){

	return function(){
		var _args = Slc.call(arguments);
		return func.apply(context, args.concat(_args)); 
	};
};

Array.prototype.forEach = Array.prototype.forEach || function(fn, cxt){

		return _each(this, fn, cxt);
};

Array.prototype.reduceRight = Array.prototype.reduceRight || function(fn /* initialValue */){
	'use strict';

	if(null === this || 'undefined' === typeof this){
		throw new TypeError('Array.prototype.reduce called on null or undefined');
	}

	if('function' !== typeof fn){
		throw new TypeError(callback + ' is not a function');
	}

	var t = Object(this), len = t.length >>> 0, k = len - 1, value;

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

;(function (w, d) {

	'use strict';

	   function CEvent ( event, params ) {
		var t, evt;
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
	  };
	  try {
	    var ce = new w.CustomEvent('test');
	  } catch(e) {

	      CEvent.prototype = Object.create(((w.Event && w.Event.prototype) || {}));
	      w.CustomEvent = null;
	      w.CustomEvent = CEvent;
	  }
})(wind, wind.document);

Object.create = Object.create || function(o, props){
	
	if (o === null || !(o instanceof Object)) {
		throw TypeError("");
	}

	var prop;
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
};

Object.keys = Object.keys || function (fu){
    
    'use strict';

    if (typeof (fu) != 'object' 
    	&& typeof (fu) != 'function') {
           return;
    }

    var j = [];
    for (var k in fuc) {
          if(Hop.call(fuc, k)) {
                j.push(k)
          }
    }
    var l = !ob.propertyIsEnumerable('toString'), 
	    m = [
	    		'toString', 
	    		'toLocaleString', 
	    		'valueOf', 
	    		'hasOwnProperty', 
	    		'isPrototypeOf', 
	    		'prototypeIsEnumerable', 
	    		'constructor'
	    	];

    if(l) {
         for (var n = 0; n < m.length; n++) {
                var o = m[n];
                if(Hop.call(fuc, o)) {
                     j.push(o);
                }
         }
    }
    return j;
};

// Store constructor
var Store = (function(){

	var requirementTypes = ['graph-ql'];

	var serviceRequirementsMap = {};
	
	return function(title){

		var that = this;

		this.getTitle = function(){

			return title;
		};

		this.toJSON = function(){

			return {title:title};
		};

		this.makeTrait = function(callback){

			var argsLeft = Slc.call(arguments, 1);

			if(typeof callback === 'function'){

				argsLeft.unshift(this);

				return callback.apply(null, argsLeft);
			}

			return null;

		};

		this.toString = function(){

			return "[object RadixxStore]";
		};
	}	

}()),

 // Action constructor 
 Action = (function(){

	
	return function(id){

		this.getId = function(){

			return id;
		};

		this.toJSON = function(){

			return {id:id};
		};

		this.toString = function(){

			return "[object RadixxAction]";
		};
	}

}()),

 futuresStates = {
      STARTED:0,
      AWAIT:1,
      RESOLVED:2,
      REJECTED:3
 },
 formatOptions = function(opts){
      var options = {}, _opts = String(opts).split(",");
      _opts.forEach(function(key){
            options[key] = true;
      });
	  options.savedData = !1;
      return options;
 },
 Routines = function(opts){

   var options = formatOptions(opts),
       fireStart,
       fireEnd,
       index,
       fired,
       firing,
       pending = [],
       queue = options.multiple && [],
       fire = function(data){
             options.savedData = !fire.$decline && options.save && data; // save it only when we are not rejecting {fire.$decline != true}!
             fired = true;
             firing = true; // firing has begun!
             index = fireStart || 0;
             fireEnd = pending.length;
             for(fireStart = 0; index < fireEnd; index++){
             		// @TODO: need to curry args instead of directly binding them
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
    add:function(){
        var len = 0;
        if(pending){ // if not disbaled
            
            var start = pending.length;
            (function add(args){
             
                   args.forEach(function(arg){
				          var type = typeof arg;
                          
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
    hasFn:function(fn){
	    var result = false;
        _each(pending, function(val){
		     if(typeof fn === "function" && fn === val)
			      result = true;
		}, this);
		return result;
    },
    hasList:function(){
        return !!pending; // [false] only when the disabled(); method has been called!!
    },
    fireWith:function(/* context, args */){
        if(pending && (!fired || queue)){
            var args = arguments.length && Slc.call(arguments) || [null, 0];
            
            if(firing){ // we are currently iterating on the {pending} list of routines
                queue.push( args ); // queue assets for recursive firing within {fire} function later
            }else{
                fire( args );
            }
        }
    },
    disable:function(){
	    if(!options.savedData){
             pending = queue = undefined;
	    }
    }
  };
    
},

// Futures constructor - Promises/A+ Spec Implementation (Influenced by jQuery though...)
Futures = function(){
	
    var defTracks = {
        resolve:['done', 'RESOLVED', Routines(['join', 'save'])],
        reject:['fail', 'REJECTED', Routines(['join','save'])],
        notify:['progress', 'AWAIT', Routines(['join', 'multiple'])]
    },
    self = this,
    keys = Object.keys(defTracks),
    setter = function(fnName, arr,  forPromise){
        var drop = (fnName != "notify");
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
    },
    i = 0,
    ax = keys.slice(),
    d,
    promise = {};
    
    
    // using a closure to define a function on the fly...

    for(d in defTracks){
        if(Hop.call(defTracks, d)){
            keys.splice(i++, 1);
            self[d] = setter(d, keys);
            self[d+"With"] = setter(d, []);
            promise[defTracks[d][0]] = setter(d, [], true);
            keys = ax.slice();
        }
    }
    
    promise.state = futuresStates.STARTED;
	
    promise.always = function(){
        return this.done.apply(self, arguments).fail.apply(self, arguments);
    };
	
    promise.promise = function(obj){
        if(obj && typeof obj == "object" && !obj.length){
            for(var i in promise){
                if(Hop.call(promise, i)){
                    obj[i] = promise[i];
                }
            }
            return obj;
        }
        return promise;
    };
	
    promise.then = function(/* fnDone, fnFail, fnProgress */){
        var ret, args = [].slice.call(arguments);
        args.forEach(function(item, i){
                     item = (typeof item == "function") && item;
                     self[defTracks[keys[i]][0]](function(){
					       var rt;
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
	
    promise.isResolved = function(){
        return !defTracks['reject'][2].hasList();
    };
    promise.isRejected = function(){
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
	return (self instanceof Futures)? self : new Futures();
},

 Observable = (function(win){

	var $instance = null,

		perstStore = (win.top !== win || !win.localStorage) ? null : win.localStorage,

	    sessStore = (win.top !== win || !win.sessionStorage ? (win.opera && !(Hop.call(win, 'opera')) ? win.opera.scriptStorage : {} ) : win.sessionStorage),

	    mode = win.document.documentMode || 0, 

	    config = {

  	},

	    watchers = [

	],
	    stores = {

	},

		storeKeys = [

	],

	    observers = {

	},

	    _promises = {

	},

	    waitQueue = [

	],
	    dispatchRegistry = {
		
	},

		cachedStorageKeys = {

	},
    
    getObjectPrototype = function(obj){
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
	},

	isNullOrUndefined = function(obj){
			return (obj === void 0);
	},

	triggerEvt = function(target, eType, detail, globale){
			   									
			var evt = new CustomEvent(eType, {
								detail:detail,
								cancelable:true,
								bubbles:false
				}), 
				dispatch = function(){ return false; };

			if((!('target' in evt)) && evt.cancelBubble === true){

				target.setCapture(true);
			}

			// set up cross-browser dispatch method.
			dispatch = target[ (!('target' in evt) ? "fireEvent" : "dispatchEvent") ];
	 
	    	// Including support for IE 8 here ;)
	    	return dispatch.apply(target, (!('target' in evt) ? ["on"+eType, evt ] : [evt])); 
		   
 	},

	operationOnStoreSignal = function(fn, queueing, action, area) { 

	    // first, retrieve the very first state data and cache it
	    if(fn.$$history.length == 1 
		&& (!fn.$$initData)){

	 		fn.$$initData = fn.$$history[0];
	    }		

	    // second, make sure that there is no future state to forth on	
	    fn.$$history = fn.$$history.slice(0, fn.$$historyIndex + 1);
	    
	    // lets setup a place to store new state, also mark out the context of this call
	    var newStoreState = false, len;

	    // create a new state of the store data by applying a given
	    // store callback function to the current history head

	    if(queueing === null){

	    	fn.$$history.length = 0; // clear out the store state since this is a hydrate call

	    	newStoreState = action.actionData;

	    }else{
	    	
	    	area._aspect = action.actionKey;

	    	area._type = action.actionType;

	    	newStoreState = fn.call(queueing, action, area.get());

	    }

		if(typeof newStoreState == 'boolean'
			|| newStoreState == undefined){
			
			throw new TypeError("Radixx: Application State unavailable after signal to Dispatcher");		

			return;
		}


	    area.put(newStoreState);
	    
	    // add the new state to the history list and increment
	    // the index to match in place
	    len = fn.$$history.push(newStoreState); /* @TODO: use {action.actionType} as operation Annotation */
	    
	    fn.$$historyIndex++;

	    if(fn.$$history.length > 21){ // can't undo/redo (either way) more than 15 moves at any time

	  		fn.$$history.unshift();
	    }
	   
	},
	  
    getNormalized = function(val){

	   	if(isNullOrUndefined(val) || val === "null")
	   		 return null;

		try{
			return JSON.parse(val);
		}catch(e){
			return String(val);
		}
	},
	   
   	setNormalized = function(val){

	   	if(isNullOrUndefined(val)) 
	   		val = null;

		try{
			return JSON.stringify(val);
		}catch(e){

			return String(val);
		}
	},
	   
    getAppState = function(){

		var appStateData = {}, key, indexStart, indexEnd, values;		
		
	    	if(('key' in sessStore) 
		   			&& (typeof sessStore.key == 'function')){

				// We iterate this way so we can support IE 8 + other browsers
				for(var i=0; i < sessStore.length; i++){
					key = sessStore.key(i);
					appStateData[key] = getNormalized(sessStore.getItem(key)) || null;
				}
    		}else{
			
			
				for(var i = 0; i < storeKeys.length; i++){
					
					key = storeKeys[i];
					
					if(cachedStorageKeys[key]){

						indexStart = win.name.indexOf(key);

						indexEnd = win.name.indexOf('|', indexStart);

						values = (win.name.substring(indexStart, indexEnd)).split(':=:');

					}

					appStateData[key] = getNormalized(values[1]) || null;
				}
			}

		return appStateData;
	},
	   
    Area = function(key){

		this.put = function(value){
			
			/* 
				In IE 8-9, writing to sessionStorage is done asynchronously (other browsers write synchronously)
				we need to fix this by using IE proprietary methods 

				See: https://www.nczonline.net/blog/2009/07/21/introduction-to-sessionstorage/ 
			*/
			
			var indexStart, 
				indexEnd, 
				isIE8Storage = ('remainingSpace' in sessStore) && (mode === 8);

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

					win.name = key + ':=:' + setNormalized(value) + '|';

				}else{

					win.name += key + ':=:' + setNormalized(value) + '|';

				}
				
				cachedStorageKeys[key] = 1;
			}

			if(isIE8Storage){
				if(typeof sessStore.commit == 'function'){
					sessStore.commit();
				}
			}
			
			triggerEvt(
					win.document, 
					'storesignal', 
					{
						url:win.location.href,
						key:key,
						newValue:value,
						source:win,
						aspect:this._aspect,
						type:this._type
					}, 
					win
			);

			return value;
		};

		this.get = function(){

			var indexStart, indexEnd, values;
			
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

		this.del = function(){

				var indexStart, 
				indexEnd;
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
	},

	handlePromises = function(){

		var promise = null, state = getAppState();

		for(var title in _promises){
			if(Hop.call(_promises, title)){
				promise = _promises[title];
				if(!promise.isResolved()){
					promise.resolve();
				}
				delete _promises[title];
			}
		}

		waitQueue.length = 0;

		for(var watcher in watchers){
			if(Hop.call(watchers, watcher)){
				watchers[watcher].call(null, state);
			}
		}

		if(!isNullOrUndefined(_tag)
			&& !isNullOrUndefined(perstStore)){
			perstStore.setItem('_tag', JSON.stringify(state));
		}
		
	},

	enforceCoverage = function(e){

		// Detecting IE 8 to apply mild hack on event object
		if(('remainingSpace' in sessStore) && (e.detail.source === null)){
			return;
		}

	},

	stateWatcher = function(e){

		e = e || win.event;

		if(storeKeys.indexOf(e.detail.key) > -1){

			var storeTitle = e.detail.key, listeners;

			if(!isNullOrUndefined(observers[storeTitle])){

				listeners = observers[storeTitle].$$store_listeners;

				for(var t=0; t < listeners.length; t++){
						    			
					listeners[t].call(stores[storeTitle], e.detail.type, e.detail.aspect);
						    
				}
			}
		}
	};

	function Dispatcher(){

		this.middlewares = [];

		if(win.document.addEventListener){
			/* IE 9+, W3C browsers all expect the 'storage' event to be bound to the window */

			win.addEventListener('storage', enforceCoverage, false);
			win.document.addEventListener('storesignal', stateWatcher, false);
		}else if(win.document.attachEvent){
			/* IE 8 expects the 'storage' event handler to be bound to the document 
				and not to the window */

			win.document.attachEvent('onstorage', enforceCoverage);
			win.document.attachEvent('onstoresignal', stateWatcher);
		}

		operationOnStoreSignal.$$undoActionsStack = [];

		operationOnStoreSignal.$$redoActionsStack = [];
	}

	Dispatcher.prototype.setMiddleware = function(middleware) {
		
			if(typeof middleware === 'function'
				/*&& (middleware.length >= 2 && middleware.length <= 3)*/){

				return this.middlewares.push(middleware);
			}

			throw new Error("Inavlid Middleware Callback -");

	};

	Dispatcher.prototype.hasMiddleware = function() {
		
			return (this.middlewares.length > 0);

	};

	Dispatcher.prototype.getRegistration = function(title){

		if(Hop.call(observers, title)){
			
			return observers[title];
		}

		return {};
	};

	Dispatcher.prototype.register = function(title, observer, defaultStoreContainer) {
			
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
	};

	Dispatcher.prototype.watch = function(callback){

			watchers.push(callback);
	}

	Dispatcher.prototype.setStoreListener = function(store, callback){

		var title = store.getTitle();

		if(!isNullOrUndefined(observers[title])){
			if(typeof callback == "function"){
				stores[title] = store;
				observers[title].$$store_listeners.push(callback);
			}
		}
	};

	Dispatcher.prototype.unsetStoreListener = function(store, callback){

		var title = store.getTitle();

		if(!isNullOrUndefined(observers[title])){
			if(typeof callback == "function"){
				var pos = observers[title].$$store_listeners.indexOf(callback);
				observers[title].$$store_listeners.splice(pos, 1);
			}
		}

	};

	Dispatcher.prototype.signalUnique = function(hydrateAction){

		if(hydrateAction.source != 'hydrate'){
			return;
		}

		// Pass this on to the event queue [await]
		win.setTimeout(handlePromises, 0);

		var stateArea = new Area(hydrateAction.target);

		operationOnStoreSignal.$$redoActionsStack.length = 0;

		operationOnStoreSignal.$$redoActionsStack.push(hydrateAction);

		operationOnStoreSignal.apply(
			null, 
			[
				observers[hydrateAction.target], 
				null, 
				hydrateAction, 
				stateArea
			]
		);

	};

	Dispatcher.prototype.signal = function(action){ 

		var compactedFunc = null,
			resolver = function(observers, dispatcher, action, prevState) {

					var title, stateArea = null; 

					operationOnStoreSignal.$$redoActionsStack.push(action);

					for(title in observers){
						if(Hop.call(observers, title)){

							stateArea = new Area(title);
							operationOnStoreSignal.apply(
								null, 
								[
									observers[title], 
									dispatcher.queueing, 
									action, 
									stateArea
								]
							);
						}	
					}

					return getAppState();
		};		


		// Some validation - just to make sure everything is okay
		if(!(action.source in dispatchRegistry)){

			return;
		}

		// determine if there are middleware callbacks registered
		if(this.hasMiddleware()){ 
			
			// collapse all middleware callbacks into a single callback
			compactedFunc = this.middlewares.concat(
								resolver.bind(null, observers, this)
							).reduceRight(function(bound, middleware){
					
					return middleware.bind(null,
						bound
					);

			});

		}else {

			compactedFunc = resolver.bind(null, observers, this);
		}

		// Pass this on to the event queue [await]
		win.setTimeout(handlePromises, 0);

		if(!isNullOrUndefined(compactedFunc)){

			compactedFunc(action, getAppState());

		}

	}

	Dispatcher.prototype.unregister = function(title){

		var observer, store, index;

		if(!isNullOrUndefined(observers[title])){
			// initial clean-up

			observer = observers[title];
			store = stores[title];
			observer.$$store_listeners.length = 0;
			observer.$$store_listeners = null;
			observer.$$historyIndex = null;
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

	Dispatcher.prototype.queueing = {
		await: function(titleList, callback){
			var current = -1, 
			    len = (titleList.length + current),
			    promise = null;

			while(++current < len){
				if(waitQueue.indexOf(titleList[current]) > -1){
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

		getInstance: function(){
			
			if($instance === null){

				$instance = new Dispatcher();
			}

			return $instance;

		},
		eachStore:function(fn, extractor, storeArray){

			_each(storeKeys, extractor.bind((storeArray = []), stores));

			var callable = fn,
			prevIndex = storeArray.length - 1,
			next = function(){
			
				var returnVal;

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
		setActionVectors: function(object, vectors){

			var _proto = getObjectPrototype(object),
			    dispatcher = this.getInstance(),
			    vector = null;
			
			for(var creator in vectors){
				if(Hop.call(vectors, creator)){
				     vector = vectors[creator];	
				     _proto[creator] = this.createActionInterface(dispatcher, vector);
				}
			}		

			return object;
		},
		createStoreInterface: function(dispatcher, method){
			

			return function(){

				var regFunc, area, argument = arguments.length? arguments[0] : null;

				if(method == 'setChangeListener'){

					return dispatcher.setStoreListener(this, argument);
				}

				if(method == 'unsetChangeListener'){

					return dispatcher.unsetStoreListener(this, argument);
				}

				if(method == 'getState'){
					var value;
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

					var title = this.getTitle(), index;

					if(title in stores){
						
						delete stores[title];

					}

					area = new Area(this.getTitle());

					area.del();

					return (area = null);
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

					regFunc = dispatcher.getRegistration(this.getTitle());

					area = new Area(this.getTitle());

					if(this.canUndo()){
						
						--regFunc.$$historyIndex;

						area.put(regFunc.$$history[regFunc.$$historyIndex]);

						regFunc = null;

						area = null;

						return true;

					}else{

						return false;
					}

										
					
				}

				if(method == 'redo'){

					regFunc = dispatcher.getRegistration(this.getTitle());

					area = new Area(this.getTitle());

					if(this.canRedo()){

						++regFunc.$$historyIndex;

						area.put(regFunc.$$history[regFunc.$$historyIndex]);

						regFunc = null;

						area = null;

						return true;

					}else{

						return false;
					}
				}
			}
			
		},
		createActionInterface: function(dispatcher, vector){
			
			if(!(vector instanceof Object)){

				throw new TypeError("Invalid Action Creator Vector, expected [object] but found ["+	typeof(vector) +"]");
			}

			return function(data, stateAspectKey){

				 // console.log('OUTER-FUNC: ', this.constructor.caller);

				var id = this.getId();

				if(!isNullOrUndefined(dispatchRegistry[id])){
					dispatchRegistry[id].actionTypes.push(
						vector
					);
				}

				if(vector.actionDefinition){
					if(!Values.isOfType(vector.actionDefinition, data)){
						
						throw new TypeError("Action Data Invalid for action: ["+vector.type+"]");

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
		watchDispatcher:function(callback){

			var dispatcher = this.getInstance();

			dispatcher.watch(callback);
					
		},
		mergeConfig: function(cfg){

		 	return _extend(cfg, _defaultConfig);
		},
		registerAction: function(){
			/* creates hex value e.g. '0ef352ab287f1' */
			var regId = Math.random().toString(16).substr(2, 13); 
	
			dispatchRegistry[regId] = {actionTypes:[]};

			return regId;

		},
		makeAggregator:function(){

				return {
					notifyAllStores:function(){
						/*
						*/
					}
				}
		},
		setMiddlewareCallback: function(middlewareFunc){

			var dispatcher = this.getInstance();

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
		setStoreObserver: function(object, regFunc, defaultStateObj) {

			if(typeof regFunc !== "function"){
				return null;
			}

			var _proto = getObjectPrototype(object),
				dispatcher = this.getInstance(),
				title     = object.getTitle(),
				method = null;

			dispatcher.register(title, regFunc, defaultStateObj);

			var methods = ['setChangeListener', 'unsetChangeListener', 'getState', 'disconnect', 'getQuerySchema', 'canRedo', 'canUndo', 'swapCallback', 'undo', 'redo', 'hydrate', 'destroy'];

			for(var c=0; c < methods.length; c++){
				method = methods[c];
				_proto[method] = this.createStoreInterface(dispatcher, method);
			}

			
		} 
	};
	
}(wind));

function Hub(){

		this.toString = function(){

			return "[object Hub]";
		}

		this.Helpers = {
			isEqual:function(former, latter){
				  if (former === latter) {
				    return true;
				  }

				  if (typeof former !== 'object' || former === null ||
				      typeof latter !== 'object' || latter === null) {
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
		}

		this.Payload = {
			type:{
				 "array":"array",
				 "date":"date",
				 "string":"string",
				 "regexp":"regexp",
				 "function":"function",
				 "object":"object",
				 "number":"number",
				 "nullable":function(value){

				 		return (value === null || value === undefined);
				 },
				 "numeric":{
				 	Int:function(value){
				 		return isFinite(value) && (value === parseInt(value))
				 	},
				 	Float:function(value){
				 		return isFinite(value) && (value === parseFloat(value))
				 	}
				 },
				 "any":function(value){
				 		
				 		return (value !== null || value !== undefined);	 			
				 }
			}
		}
}


Hub.prototype.constructor = Hub;

Hub.prototype.onShutdown = function(handler){

	if(typeof handler === 'function'){

		_ping = handler;
	}

};

/*Hub.prototype.onError = function(handler){

};*/

Hub.prototype.onDispatch = function(handler){

	if(typeof handler === 'function'){

		Observable.watchDispatcher(handler);
	}

};

Hub.prototype.requestAggregator = function(){

	return Observable.makeAggregator();
};

Hub.prototype.eachStore = function(callback){

	return Observable.eachStore(callback, function(stores, key){
			this.push(stores[key]);
	}, null);
};

Hub.prototype.makeActionCreators = function(vectors){

 	function _action(registrationId){
		Action.apply(this, Slc.call(arguments));
	}

	var actionObject = new _action(Observable.registerAction());

	return Observable.setActionVectors(actionObject, vectors);
};

Hub.prototype.makeStore = function(dataTitle, registerCallback, defaultStateObj){

	function _store(){
		Store.apply(this, Slc.call(arguments));
	}

	var storeObject = new _store(dataTitle);

	Observable.setStoreObserver(storeObject, registerCallback, defaultStateObj);

	return storeObject;
};

Hub.prototype.attachMiddleware = function(callback){

	Observable.setMiddlewareCallback(callback);

};

var _radixx = new Hub(),

__hasDeactivated = false,
	 
$beforeunload = function(e) {
										
	       // push to event/UI queue (using `setTimeout`) to ensure execution
	       // as beforeunload dialog blocks the JS thread waiting for
	       // the user to either click button "Leave this Page" OR "Stay on Page" button
	       // before any `setTimeout` function(s) are called 
	       // (i.e any event/UI queue callbacks registered using `setTimeout`)

	       // If "Leave this Page" button is clicked, then the `unload` event fires
	       // if not, the `unload` event doesn't fire at all
		   

	       // See: https://greatgonzo.net/i-know-what-you-did-on-beforeunload/

	       /* `lastActivatedNode` is used to track the DOM Node that last had focus (or was clicked) before the browser triggered the `beforeunload` event */

	        var lastActivatedNode = (window.currentFocusElement // Mobile Browsers
						|| e.originalEvent.explicitOriginalTarget // old/new Firefox
						|| (e.originalEvent.srcDocument && e.originalEvent.srcDocument.activeElement) // old Chrome/Safari
							|| (e.originalEvent.currentTarget && e.originalEvent.currentTarget.document.activeElement) // Sarafi/Chrome/Opera/IE
									), 
	       	 	leaveMessage = "Are you sure you want to leave this page ?", // if the "imaginary" user is logging out
	       	 	isLogoff = (('href' in lastActivatedNode) && (lastActivatedNode.href.indexOf($beforeunload.$$href) > -1)),
		       	__timeOutCallback = function(){
		       			
                    	// console.log('did user clicked the \'Leave Page\' button ?', (isLogoff ? 'Yes' : 'No'));                    

			           	__hasDeactivated = __timeOutCallback.lock;

		       	};

				// console.log('Node: '+ lastActivatedNode);
			
		       	__timeOutCallback.lock = __hasDeactivated = true; 
		       	beforeUnloadTimer = setTimeout(__timeOutCallback, 0);  

		       	if(isLogoff){ // IE/Firefox/Chrome 34+

		       		e.originalEvent.returnValue = leaveMessage; 
		       	}
	       
       		 	/* if (isLogoff) isn't true, no beforeunload dialog is shown */
	       		return ((isLogoff) ?  ((__timeOutCallback.lock = false) || leaveMessage) : clearTimeout(beforeUnloadTimer));
	       
},
   
$unload = function(e){

		/*

	   		This seems to be the best way to setup the `unload` event 
	   		listener to ensure that the load event is always fired even if the page
	   		is loaded from the `bfcache` (Back-Forward-Cache) of the browser whenever
	   		the back and/or forward buttons are used for navigation instead of links.

	   		Registering it as a property of the `window` object sure works every time
		*/

		if(!__hasDeactivated){

			setTimeout(function(){

				var appstate = {};
			
				_radixx.eachStore(function(store, next){

					var title = store.getTitle();

					appstate[title] = store.getState(); 
				
					store.disconnect();
					store.destroy();

					next();

				});

				_ping(appstate);

				__unload(e);

			}, 0);
		}

};

_radixx.constructor.prototype.configure = function(config){

	var cfg = Observable.mergeConfig(config);

	if(!cfg.runtime.spaMode){
		
		if(typeof cfg.runtime.shutDownHref === 'string'
			&& cfg.runtime.shutDownHref.length != 0){

			$beforeunload.$$href = cfg.runtime.shutDownHref;
			wind.onbeforeunload = $beforeunload;
			wind.onunload = $unload;

		}
	}

	if(cfg.persistenceEnabled){

		_tag = '0x3674993769129020';
	}
};

return _radixx;

});