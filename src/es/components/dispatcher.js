import { wind, Hop, Futures, isNullOrUndefined, each, extend } from '../utils/routines/basics.js';
import { $createBeforeTearDownCallback, $createTearDownCallback } from '../utils/routines/extras.js';

    
try {
      const ce = new wind.CustomEvent('test');
} catch(e) {

        CEvent.prototype = wind.Object.create(((w.Event && w.Event.prototype) || {}));
        wind.CustomEvent = null;
        wind.CustomEvent = CEvent;
}

const persistStore = (wind.top !== wind || !wind.localStorage) ? null : wind.localStorage;

const sessStore = (wind.top !== wind || !wind.sessionStorage ? (wind.opera && !(Hop.call(wind, 'opera')) ? wind.opera.scriptStorage : {} ) : wind.sessionStorage);

const mode = wind.document.documentMode || 0;

let autoRehydrationOccured = false;

let config = null;

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

    const cachedStorageKeys = {

};

const getAppOriginForPersist = cfg => String(wind.location.origin + (cfg.localHostDev ? ':'+wind.document.documentElement.id : ''));

const generateTag = origin => {

	const _cdata = persistStore.getItem(origin);
	
	if(!isNullOrUndefined(_cdata)){

		return getNormalized(_cdata);
	}

	return String(Math.random()).replace('.','x_').substring(0, 11);
};

const defaultConfig = {
		runtime:{
			spaMode:true, 
			shutDownHref:''
		},
		persistenceEnabled:false,
		autoRehydrate:false,
		universalCoverage:false,
		localHostDev:false
};

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
					wind.document, 
					'storesignal', 
					{
						url:wind.location.href,
						key:_key,
						newValue:newStoreState,
						source:wind,
						aspect:action.actionKey,
						type:action.actionType
					}, 
					wind
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

	const getCurrentActionOnStack = () => {

		const actionStack = operationOnStoreSignal.$$redoActionsStack;

		if(actionStack.lenth){
			return actionStack[actionStack.length - 1];
		}

		return null;
	};

    const coverageNotifier = appState => {
	    
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

	const setAppState = appState => {

			each(appState, (isolatedState, storeTitle) => {

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

	                    indexStart = wind.name.indexOf(key);

	                    indexEnd = wind.name.indexOf('|', indexStart);

	                    values = (wind.name.substring(indexStart, indexEnd)).split(':=:') || ["", null];

	                    _data = values[1];

	                }

	                appStateData[key] = getNormalized(_data) || null;
	            }
	        }

	        return appStateData;
	};

	const handlePromises = () => {
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
    };

	const enforceCoverage = e => {

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
    };

	const stateWatcher = e => {

		e = e || wind.event;

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

	/**
	    Though IE 9 to IE 11 supports the CustomEvent constructor, IE throws an error {Object doesn't support this action} 
	    whenever it's used. This weird behaviour is fixed below
	    See: https://stackoverflow.com/questions/14358599/object-doesnt-support-this-action-ie9-with-customevent-initialization
	*/

	function CEvent ( event, params ) {
	    let t;
	    let evt;
	    let d = wind.document;
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

	function setupConfigSettings(config, hub){

		 	if(config.universalCoverage){

		 		config.persistenceEnabled = true;
		 	}

		 	if(config.persistenceEnabled){

					// prepare Origin 
					const _origin = getAppOriginForPersist(config);

					const _tag = generateTag(_origin);

					persistStore.setItem(_origin, _tag);

					enforceCoverage.$$origin = _origin;

					enforceCoverage.$$tag = _tag;

					coverageNotifier.$$canOmit = true;

					coverageNotifier.$$tag = _tag;

					hub.onDispatch(coverageNotifier);
			}

            if(config.autoRehydrate === true){
		    
			    	let data = null;
	                    
	                if(!isNullOrUndefined(enforceCoverage.$$tag) 
	                        && persistStore){
	                    	data = getNormalized(persistStore.getItem(enforceCoverage.$$tag));
			    	}
			    
			    	if(data instanceof Object 
	                            && data.state){
	                        setAppState(data.state);
	                        this.updateAutoRehydrationState();
                  	}
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

					if(wind.addEventListener){
						wind.document.documentElement.addEventListener('click', $createBeforeTearDownCallback(config), false);
						wind.document.addEventListener('click', $createTearDownCallback(hub), false);
					}else{
						wind.document.documentElement.attachEvent('onclick', $createBeforeTearDownCallback(config));
						wind.document.attachEvent('onclick', $createTearDownCallback(hub), false);
					}
				}
			}


	}

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
						indexStart = wind.name.indexOf(key);
						
						indexEnd = wind.name.indexOf('|', indexStart);

						wind.name = wind.name.replace(wind.name.substring(indexStart, indexEnd), '');
					}

					if(wind.name === ""){

						wind.name = `${key}:=:${setNormalized(value)}|`;

					}else{

						wind.name += `${key}:=:${setNormalized(value)}|`;

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
				
				try{
				
					return getNormalized(sessStore.getItem(key)) || null;
					
				}catch(e){
				
					if(cachedStorageKeys[key]){

						indexStart = wind.name.indexOf(key);

						indexEnd = wind.name.indexOf('|', indexStart);

						values = (wind.name.substring(indexStart, indexEnd)).split(':=:') || [0, 0];

						return getNormalized(values[1]) || null;
					}
					
					return null;
					
				}
			};

			this.del = () => {

					let indexStart;

					let indexEnd;
					/* This is a fallback to support Opera Mini 4.4+ on Mobile */
				
					try{
						
						return sessStore.removeItem(key);
						
					}catch(e){
				
						if(cachedStorageKeys[key]){

							// we're in delete mode
							indexStart = wind.name.indexOf(key);

							indexEnd = wind.name.indexOf('|', indexStart);

							wind.name = wind.name.replace(wind.name.substring(indexStart, indexEnd), '');
							
							delete cachedStorageKeys[key];
						}
						
						return;
					}
			};

			return this;
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

        initCatchers(userConfig, hub) {

        		if(isNullOrUndefined(config)){

					config = extend(userConfig, defaultConfig);

					setupConfigSettings.apply(this, [config, hub]);
        		}

                if(wind.document.addEventListener){
                    /* IE 9+, W3C browsers all expect the 'storage' event to be bound to the window */
                    if(config.universalCoverage){
                        wind.addEventListener('storage', enforceCoverage, false);
                    }

                    wind.document.addEventListener('storesignal', stateWatcher, false);

                }else if(wind.document.attachEvent){
                    /* IE 8 expects the 'storage' event handler to be bound to the document 
                        and not to the window */
                    if(config.universalCoverage){
                        wind.document.attachEvent('onstorage', enforceCoverage);
                    }

                    wind.document.attachEvent('onstoresignal', stateWatcher);
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
	            wind.setTimeout(handlePromises, 0);

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

	            const storeTitle = store.getTitle();
	            const isolatedState = {}; 
	            const regFunc = this.getRegistration(storeTitle);
	            const stateArea = new Area(storeTitle);

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
	                            wind.setTimeout(fireWatchers.bind(null, isolatedState), 0);

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
	                            wind.setTimeout(fireWatchers.bind(null, isolatedState), 0);

	                            return true;

	                        }
	                    break;
	                }

	                return false;
        }

        deletePersistenceTagAndData(){

        	if(isNullOrUndefined(config)){

        		return false;
        	}

        	const _origin = getAppOriginForPersist(config);

			const _tag = generateTag(_origin);

			persistStore.removeItem(_origin);

			persistStore.removeItem(_tag);

			return true;
        }

        rebuildStateFromActions() {

	            const actionsStack = operationOnStoreSignal.$$redoActionsStack;

	            each(actionsStack, (action, index) => {

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
	            wind.setTimeout(handlePromises, 0);

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

export { Dispatcher, Area }