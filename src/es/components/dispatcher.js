import { wind } from '../utils/routines/basics.js';

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
    
try {
      const ce = new wind.CustomEvent('test');
} catch(e) {

        CEvent.prototype = wind.Object.create(((w.Event && w.Event.prototype) || {}));
        wind.CustomEvent = null;
        wind.CustomEvent = CEvent;
}

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
