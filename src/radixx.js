 /*!
  * @lib: Radixx
  * @version: 0.0.1
  * @author: Ifeora Okechukwu
  * @created: 30/12/2016
  *
  *
  * @desc: Implementation of Facebook Flux Architecture with a Twist.
  */

 !function(root, factory){

 	if(typeof module != "undefined" && !!(module.exports)){
 		module.exports = factory(root);
 	}else if(typeof define != "undefined" && !!(define.amd)){
 		define("Radixx", function(){ return factory(root); });
 	}else{
 		window['Radixx'] = factory(root);
 	}

 }(this, function(wind){ 

	// 'use strict';  Can't use strict mode cos i wish to use {void 0} to check nulled/undefined vars

Object.keys = Object.keys || function (fu){
    if (typeof (fu) != 'object' 
    	&& typeof (fu) != 'function') {
           return;
    }
    var j = [];
    for (var k in fuc) {
          if(hOwn.call(fuc, k)) {
                j.push(k)
          }
    }
    var l = !ob.propertyIsEnumerable('toString'), 
	    m = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'prototypeIsEnumerable', 'constructor'];

    if(l) {
         for (var n = 0; n < m.length; n++) {
                var o = m[n];
                if(hOwn.call(fuc, o)) {
                     j.push(o);
                }
         }
    }
    return j;
};



var Hop = ({}).hasOwnProperty,

Slc = ([]).slice,

_each = function (obj, iterator, context){
	for(var prop in obj){
		if(Hop.call(obj, prop)){
			iterator.call(context, obj[prop], prop);
		}
	}
},

_curry = function (func, args, context){
	return function(){
		var _args = Slc.call(arguments);
		return func.apply(context, _args.push(_args, [].concat(args))); 
	}
},

// Store constructor
Store = (function(){

	
	return function(title){

		this.getTitle = function(){
			return title;
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
    setter = function(dx, arr,  forPromise){
        var drop = (dx != "notify");
        if(!arr.length && !forPromise) return defTracks[dx][2].fireWith;
        return (!forPromise)? function(){
            if(self.state >= 0 && self.state <=1){
                self.state = futuresStates[defTracks[dx][1]];
            }
            defTracks[dx][2].fireWith(self === this? self : this, [].slice.call(arguments));
            if(drop){
			    defTracks[arr[0]][2].disable();
                defTracks[arr[1]][2].disable();
			    switch(dx){	
				   case "reject":
				   case "resolve":
				      self.state = futuresStates[defTracks[dx][1]];
				   break;
			    }	
			}
            return true;
        } : function(){
            if(self.state >= 0 && self.state <=1){
                defTracks[dx][2].add.apply(self, Slc.call(arguments));
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
					       try{ // Promises/A+ specifies that errors should be conatined and returned as value of rejected promise
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

	    sessStore = win.sessionStorage,

	    mode = win.document.documentMode || 0, 

	/* @TODO: Implement undo actions for all store data

	    undoStack = [
		
	], */

	    watchers = [

	],
	    stores = {

	},

	    observers = {

	},

	    _promises = {

	},

	    waitQueue = [

	],
	    dispatchRegistry = {
		
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
	   getNormalized = function(val){

	   	if(isNullOrUndefined(val) || val === "null")
	   		 return null;

		try{
			return (win.JSON)? JSON.parse(val) : (new Function('return '+val)());
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

		var appStateData = {}, key;		

		// We iterate this way so we can support IE 8 
		for(var i=0; i < sessStore.length; i++){
			key = sessStore.key(i);
			appStateData[key] = getNormalized(sessStore.getItem(key));
		}

		return appStateData;
	},
	   Area = function(key){

		this.put = function(value){
			
			// Detecting IE 8 to enable hack
			if(sessStore.remainingSpace && mode === 8){
				sessStore.$$key = key;
				sessStore.constructor.$$currentStoreType = sessStore;
			}
			return sessStore.setItem(key, setNormalized(value));
		};

		this.get = function(){
			return getNormalized(sessStore.getItem(key)) || null;
		};

		this.del = function(){
			return sessStore.removeItem(key);
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

		for(var watcher in watchers){
			if(Hop.call(watchers, watcher)){
				watchers[watcher].call(null, state);
			}
		}
		
	},

	stateWatcher = function(e){

		e = e || win.event;
		var listeners;

		// Detecting IE 8 to apply mild hack on event object
		if(sessStore.remainingSpace && (e.source === null)){
			if('$$key' in sessStore){
				e.key = sessStore.$$key;
				e.storageArea = sessStore.constructor.$$currentStoreType;
			}
		}

		if(e.storageArea === sessStore){

			var storeTitle = e.key;

			if(!isNullOrUndefined(observers[storeTitle])){

				listeners = observers[storeTitle].$$store_listeners;

				for(var t=0; t < listeners.length; t++){
						    			
					listeners[t].call(stores[storeTitle], null);
						    
				}
			}
		}
	};

	function Dispatcher(){

		if(win.addEventListener){
			/* IE 9+, W3C browsers */
			win.addEventListener('storage', stateWatcher, false);
		}else if(win.document.attachEvent){
			/* IE 8 expects the handler to be bound to the document 
				and not to the window */
			win.document.attachEvent('onstorage', stateWatcher);
		}
	}

	Dispatcher.prototype.register = function(title, observer){
		
			observer.$$store_listeners = [];
			observers[title] = observer;

			return true;
	}

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

	Dispatcher.prototype.signal = function(action){ 

		// Pass this on to the event queue [await]
		win.setTimeout(handlePromises, 0); 

		// Some validation - just to make sure
		if(!(action.source in dispatchRegistry)){
			return;
		}

		for(var title in observers){
			if(Hop.call(observers, title)){
				observers[title].call(this.queueing, action, (new Area(title)));
			}	
		}
		waitQueue.length = 0;
	}

	Dispatcher.prototype.unregister = function(title){
		var observer;

		if(!isNullOrUndefined(observers[title])){
			observer = observers[title];
			observer.$$store_listeners.length = 0;
			observer.$$store_listeners = null;
			
			delete observers[title];
			observer = null;
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
	}

	return {

		getInstance: function(){
			if($instance === null){
				$instance = new Dispatcher();
			}

			return $instance;

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

				var argument = arguments[0];

				if(method == 'setChangeListener'){
					return dispatcher.setStoreListener(this, argument);
				}

				if(method == 'unsetChangeListener'){
					return dispatcher.unsetStoreListener(this, argument);
				}

				if(method == 'getState'){
					var area = new Area(this.getTitle());
					var value = area.get();
					area = null;
					return value;
				}
			}
			
		},
		createActionInterface: function(dispatcher, vector){
			

			return function(data){

				 // console.log('OUTER-FUNC: ', arguments.callee);

				var id = this.getId();

				if(!isNullOrUndefined(dispatchRegistry[id])){
					dispatchRegistry[id].actionTypes.push(
						vector
					);
				}	
				
				dispatcher.signal({
					source:id,
					actionType:vector,
					actionData:data
				});
			}
		},
		watchDispatcher:function(callback){

			var dispatcher = this.getInstance();

			dispatcher.watch(callback);
					

		},
		configureDispatcher: function(cfg){

			// mode code here...
		},
		registerAction: function(){
			/* creates hex value e.g. '0ef352ab287f1' */
			var regId = Math.random().toString(16).substr(2, 13); 
	
			dispatchRegistry[regId] = {actionTypes:[]};

			return regId;

		},
		setStoreObserver: function(object, regFunc){
			if(typeof regFunc !== "function"){
				return null;
			}

			var _proto = getObjectPrototype(object),
				dispatcher = this.getInstance(),
				title     = object.getTitle(),
				method = null;

			dispatcher.register(title, regFunc);

			var methods = ['setChangeListener', 'unsetChangeListener', 'getState'];

			for(var c=0; c < methods.length; c++){
				method = methods[c];
				_proto[method] = this.createStoreInterface(dispatcher, method);
			}

			
		} 
	};
	
} (wind));

function Hub(){

		this.toString = function(){
			return "[object Hub]";
		}
};

// @TODO: figure out how to use this to manipulate application state more efficiently

// Hub.prototype.UI_STATE_DATA = 1; - non-persisted application data
// Hub.prototype.DOMAIN_STATE_DATA = 2; persisted application data

Hub.prototype.constructor = Hub;

Hub.prototype.config = function(config){

	Observable.configureDispatcher(config);
};

Hub.prototype.onDispatch = function(handler){

	Observable.watchDispatcher(handler);

};

Hub.prototype.createAction = function(vectors){

 	function _action(registrationId){
		Action.apply(this, Slc.call(arguments));
	}

	var novelAction = new _action(Observable.registerAction());

	return Observable.setActionVectors(novelAction, vectors);
};

Hub.prototype.createStore = function(dataTitle, registerCallback){

	function _store(){
		Store.apply(this, Slc.call(arguments));
	}

	var novelStore = new _store(dataTitle);

	Observable.setStoreObserver(novelStore, registerCallback);

	return novelStore;
};

Hub.prototype.mixin = function(){

	return (function(){
		/* @TODO: Still testing this out for React */

		this.get = function(){
			this.state;
		}

		this.set = function(s){
			this.setState(s);
		};

		return {
			get:this.get,
			set:this.set
		}
	}());
}

return (new Hub());

});
