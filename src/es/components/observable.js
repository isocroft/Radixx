import { wind, each, Hop, isNullOrUndefined } from '../utils/routines/basics.js';
import { Dispatcher, Area } from './dispatcher.js';
import { Values } from '../utils/routines/extras.js';


		let $instance = null;

		const getInstance = function(){
			
			if($instance === null){

				$instance = new Dispatcher();
			}

			return $instance;

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

		const eachStore = function(fn, extractor, storeArray) {

            	const dispatcher = getInstance();

            	return dispatcher.iterateOnStore(fn, extractor, storeArray);
        };

		const createStoreInterface = function(dispatcher, method) {
			

			return function(){
                let regFunc;
                let area;
                const argument = arguments.length ? arguments[0] : null;

                if(method == 'setChangeListener'){

					return dispatcher.setStoreListener(this, argument);
				}

                if(method == 'unsetChangeListener'){

					return dispatcher.unsetStoreListener(this, argument);
				}

                if(method == 'getState'){

					var title = this.getTitle(), value;
					area = new Area(title);
					value = area.get();
					area = null;

					if(value === null){

						regFunc = dispatcher.getRegistration(title);

						value = (regFunc.$$history.length ? regFunc.$$history[0] : null);

					}else if(typeof argument === 'string'){

						if(value instanceof Object){

							if(Hop.call(value, argument)){

								value = value[argument];
							}
						}
					}

					return value;
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
			
		};

		const createActionInterface = function(dispatcher, vector) {
			
			if(!(vector instanceof Object)){

				throw new TypeError(`Invalid Action Creator Vector, expected [object] but found [${typeof(vector)}]`);
			}

			return function(data, stateAspectKey){

				 // console.log('OUTER-FUNC: ', this.constructor.caller);

				const id = this.getId();
				
				let typesBitMask = 0;

				dispatcher.addToActonsRegistry(id, vector);
				
				if(vector.actionDefinition instanceof Array){
					
					each(vector.actionDefinition, function(definition){
					
						typesBitMask |= Number(Values.isOfType(definition, data));
	
					});
					
					if(!typesBitMask){
					   
						throw new TypeError(`Action Data Invalid for action: [${vector.type}]`);
				   	}
				
				}else{
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
		};

		const watchDispatcher = function(callback) {

			const dispatcher = getInstance();

			dispatcher.watch(callback);
					
		};

		const isAppStateAutoRehydrated = function() {

			const dispatcher = getInstance();

			return dispatcher.getAutoRehydrationState();

		};

		const setupShutdownCallback = function(callback, hub){

				
			hub._ping = callback;
				
		};

		const mergeConfig = function(userConfig, hub) {

			const dispatcher = getInstance();

			return dispatcher.initCatchers(userConfig, hub);
		};

		const purgePersistStore = function() {

			const dispatcher = getInstance();

			dispatcher.deletePersistenceTagAndData();

		};

		const registerAction = function() {
			/* creates hex value e.g. '0ef352ab287f1' */
			const regId = Math.random().toString(16).substr(2, 13); 
	
			const dispatcher = getInstance();

			dispatcher.setActionsRegistry(regId);

			return regId;

		};

		const makeAggregator = function() {

				return {
					query:`graphql {
						
					}`
				};
		};

		const setMiddlewareCallback = function(middlewareFunc) {

			const dispatcher = getInstance();

			// HERE: using this try/catch for control flow and not defensive programming
			try{

				dispatcher.getMiddleware();

			}catch(ex){

				dispatcher.setMiddleware(
					middlewareFunc
				);

			}

		};

		const setActionVectors = function(object, vectors) {

            const _proto = getObjectPrototype(object);
            const dispatcher = getInstance();
            let vector = null;

            for(const creator in vectors){
				if(Hop.call(vectors, creator)){
				     vector = vectors[creator];	
				     _proto[creator] = createActionInterface(dispatcher, vector);
				}
			}

            return object;
        };

		const setStoreObserver = function(object, regFunc, defaultStateObj) {
            
            if(typeof regFunc !== "function"){
				return null;
			}

            const _proto = getObjectPrototype(object);
            const dispatcher = getInstance();
            const title     = object.getTitle();
            let method = null;

            dispatcher.register(title, regFunc, defaultStateObj);

            const methods = [
            	'setChangeListener', 
            	'unsetChangeListener', 
            	'getState', 
            	'disconnect', 
            	'getQuerySchema', 
            	'canRedo', 
            	'canUndo', 
            	'swapCallback', 
            	'undo', 
            	'redo', 
            	'hydrate', 
            	'destroy'
        	];

            for(let c=0; c < methods.length; c++){
				method = methods[c];

				_proto[method] = createStoreInterface(dispatcher, method);
			}
		};

export { eachStore, makeAggregator, registerAction, setupShutdownCallback, mergeConfig, purgePersistStore, setMiddlewareCallback, setActionVectors, setStoreObserver, watchDispatcher, isAppStateAutoRehydrated }