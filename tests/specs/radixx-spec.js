/** 
 * @title: Unit Testing
 * @project: Radixx Flux Library
 */


describe("The Radixx Flux Library :", function() {

			Radixx.configure({
				
			});
  
            var actions = Radixx.makeActionCreators({
            		'createItem':{
            			type:'CREATE_ITEM',
            			actionDefinition:Radixx.Payload.type.array
            		},
            		'addItem':{
            			type:'ADD_ITEM',
            			actionDefinition:Radixx.Payload.type.object
            		}
            });

            var Routines = {
            		storeCallbackSpy:jasmine.createSpy('storeCallbackSpy() spy').and.callFake(
            				function(action, state){  

            					var items = state;

            					switch(action.actionType){
            						case "CREATE_ITEM":

            							if(items.length === 0){
            								items.push(action.actionData);
            							}
            						break;
            						case "ADD_ITEM":

            							items.push(action.actionData);
            						break;
            						default:

            						break;
            					}

            					return items; 
            				}
            		),
            		middlewareCallbackSpy:jasmine.createSpy('middlewareCallbackSpy() spy').and.callFake(
            				function(next, action, prevState){

				            	console.log('before-action', prevState);

				            	console.log('action-type', action.actionType);

				            	console.log('action-data', action.actionData);

				            	var nextState = next(
				            		action,
				            		prevState
				        		);

					            console.log('after-action', nextState);

					            return true;

				            }
        			),
        			dispatchListenerSpy:jasmine.createSpy('dispatchListenerSpy() spy').and.callFake(
        					function(appState){
        						console.log("on-dispatch > \n\n\t appState: ", appState);
        					}
    				)
            	};


            var store = Radixx.makeStore("items", Routines.storeCallbackSpy, []);

            Radixx.onDispatch(Routines.dispatchListenerSpy);

            Radixx.attachMiddleware(function(next, action, prevState){

            	if(action.actionData instanceof Array){

            		action.actionData.push(1,3,4,5);
            	}

            	var value = next(
            		action,
            		prevState
        		);

	            console.log(value, "-------------------------------");

            });

            Radixx.attachMiddleware(Routines.middlewareCallbackSpy);

            var listener = jasmine.createSpy('dummy');

			store.setChangeListener(listener);

			beforeEach(function() {
			  	
	            jasmine.addMatchers({
				    toBeAStore:function(util, customEqualityTesters){

				    		return {
						       	compare:function(actual, expected){

							        if(!expected){
									   expected = true;
									}
							   
							        var result = {};
									
									result.pass = util.equals((actual.toString() == "[object RadixxStore]"), expected, customEqualityTesters);
				    
				    				if(result.pass){
									     result.message = "It's a [Radixx] store object";
									}else{
									    result.message = "It's not a [Radixx] store object";
									}
									
									return result;
								}		
							};			
				    },
				    toBeAnActionCreator:function(util, customEqualityTesters){

				    	return {
						       compare:function(actual, expected){

							        if(!expected){
									   expected = true;
									}
							   
							        var result = {};
									
									result.pass = util.equals((actual.toString() == "[object RadixxActionCreator]"), expected, customEqualityTesters);
				    
									if(result.pass){
									     result.message = "It's a [Radixx] action object";
									}else{
									    result.message = "It's not a [Radixx] action object";
									}
									
									return result;
								}	
						};			
				    }, 
					toBeAFunction:function(util, customEqualityTesters){
					    return {
						       compare:function(actual, expected){
							        if(!expected){
									   expected = true;
									}
							   
							        var result = {};
									
									result.pass = util.equals((typeof actual == "function"), expected, customEqualityTesters);
									
									if(result.pass){
									     result.message = "It's a function";
									}else{
									    result.message = "It's not a function";
									}
									
									return result;
							   }
					    };
					}
			    });
				
			});
			
			afterEach(function() {

				 if(store.canUndo()){
				 	
				 	 store.undo();
				 }

			});
			
			it("should expose relevant objects and API methods", function() {
			
				   expect(actions).toBeAnActionCreator();
				
				   expect(actions.createItem).toBeAFunction();

				   expect(actions.addItem).toBeAFunction();
				
				   expect(store).toBeAStore();
				   
				   expect(store.getState).toBeAFunction();

				   expect(store.makeTrait).toBeAFunction();

				   expect(store.setChangeListener).toBeAFunction();

				   expect(store.unsetChangeListener).toBeAFunction();

				   expect(store.hydrate).toBeAFunction();

				   expect(store.swapCallback).toBeAFunction();

				   expect(store.undo).toBeAFunction();

				   expect(store.redo).toBeAFunction();
				
            });


            it("should never call the store callback(s) whenever the store is hydrated except listener(s)", function(){

            	store.hydrate(['hello', 'world']);

            	expect(Routines.storeCallbackSpy).not.toHaveBeenCalled();

            	expect(listener).toHaveBeenCalled();
            })
			
			it("should trigger the store and middleware callback(s) whenever the action creator(s) are called", function(){
				  
				  actions.createItem([]);

				  expect(Routines.storeCallbackSpy).toHaveBeenCalled();

				  expect(Routines.middlewareCallbackSpy).toHaveBeenCalled();
				  
			});

			it("should trigger the store listener(s) whenever the action creator(s) are called", function(){
				
				  actions.addItem({});

				  expect(listener).toHaveBeenCalled();
				  
			});

			it("should trigger the dispatch listener to be called whenever the action creator(s) are called", function(done){

				actions.addItem({});

				setTimeout(function(){

					expect(Routines.dispatchListenerSpy).toHaveBeenCalled();

					done();

				},0);

            });

			it("should throw an error if the payload is not of the type as defined by the action-definition", function(){

				expect(function(){ 
				  
				        actions.createItem({});
						
			  	}).toThrowError('Action Data Invalid for action: [CREATE_ITEM]');

			});

			it("should throw an error if `undefined` is returned from the store callback", function(){

				  store.swapCallback(function(action, state){
				  		
				  		return undefined;
				  });

				  expect(function(){ 
				  
				        actions.addItem({});
						
				  }).toThrowError("Radixx: Application State unavailable after signal to Dispatcher"); 
			});




});
    
