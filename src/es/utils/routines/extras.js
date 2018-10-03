import { wind } from './basics.js';

let __beforeunload = wind.onbeforeunload;

let __unload = wind.onunload;

let __hasDeactivated = false;

let _checkAndKillEventPropagation = event => {
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

    const lastActivatedNode = (wind.currentFocusElement // Mobile Browsers [ Custom Property ]
                || e.explicitOriginalTarget // old/new Firefox
                    || (e.srcDocument && e.srcDocument.activeElement) // old Chrome/Safari
                        || (e.currentTarget && e.currentTarget.document.activeElement) // Sarafi/Chrome/Opera/IE
                            || e.srcElement
                                || e.target);

    // if the "imaginary" user is logging out
    const leaveMessage = "Are you sure you want to leave this page ?";

    const isLogoff = ((typeof lastActivatedNode.hasAttribute == 'function' && lastActivatedNode.hasAttribute('data-href') && lastActivatedNode.getAttribute('data-href').includes(config.runtime.shutDownHref)) 
                    || (('href' in lastActivatedNode) && (lastActivatedNode.href.includes(config.runtime.shutDownHref))));

    const __timeOutCallback = () => {
            
            __hasDeactivated = __timeOutCallback.lock;

    };

    // console.log('Node: '+ lastActivatedNode);

    __timeOutCallback.lock = __hasDeactivated = true;
    beforeUnloadTimer = wind.setTimeout(__timeOutCallback, 0);

    if(isLogoff){ // IE/Firefox/Chrome 34+
        if(!!~e.type.indexOf('beforeunload')){
            e.returnValue = leaveMessage; 
        }else{
            _confirm = wind.confirm && wind.confirm(leaveMessage);
            
            if(!_confirm){
                _checkAndKillEventPropagation(e);
            }
        }
    }else{
        _checkAndKillEventPropagation(e);
    }

    /* if (isLogoff) isn't true, no beforeunload dialog is shown */
    return ((isLogoff) ?  ((__timeOutCallback.lock = false) || leaveMessage) : wind.clearTimeout(beforeUnloadTimer));
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

                wind.setTimeout(() => {

                        let appstate = {};
                    
                        hub.eachStore((store, next) => {

                            const title = store.getTitle();

                            appstate[title] = store.getState(); 
                        
                            store.disconnect();
                            store.destroy();

                            next();

                        });

                        if(typeof hub._ping == "function"){

                            hub._ping.call(hub, appstate);
                        }

                        if(e.type != 'click'){
                            __unload(e);
                        }

                }, 0);
            }
};

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

            if(typeof type === 'function'){
                
                return type(value);
            }

            else if(typeof type === 'string'
                        && (type in this.typesMap)){
                type = type.toLowerCase(); // hoisting

                return (/^string|function$/.test(typeof value)) 
                            || (Object(value) instanceof this.typesMap[type]);
            }

            return false;
      }
};


// Store Constructor
const Store = (function(){

	var requirementTypes = ['graph-ql', 'rest'];

	var serviceRequirementsMap = {};

	var dependentStores = {};
	
	return function(title){

		var that = this;

		this.getTitle = function(){

			return title;
		};

		this.toJSON = function(){

			return {
                title
            };
		};

		this.makeTrait = function(callback){

			var argsLeft = Slc.call(arguments, 1);

			if(typeof callback === 'function'){

				argsLeft.unshift(this);

				return callback.apply(null, argsLeft);
			}

			return null;

		};

		this.waitsFor = function(){

			([]).push.apply(dependentStores, Slc.call(arguments));
		};

		this.toString = function(){

			return "[object RadixxStore]";
		};
	}	

}());

// Action constructor
const  Action = (function(){

    return function(id){

            this.getId = function(){

                return id;
            }

            this.toJSON = function(){

                return {
                    id
                }
            };

            this.toString = function(){

                return "[object RadixxActionCreator]";
            };
    }

}());


export { Values, Store, Action, $createBeforeTearDownCallback, $createTearDownCallback }