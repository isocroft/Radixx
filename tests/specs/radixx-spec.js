/** 
 * @title: Unit Testing
 * @project: Radixx
 */


describe("Radixx: ", function() {
  
            var action = Radixx.createAction({
            		'createItem':'CREATE_ITEM'
            });
            var Routines = {
            		storeCallbackSpy:jasmine.createSpy('storeCallbackSpy() spy').and.callFake(
            				function(){  return []; }
            		)
            	};
            var store = Radixx.createStore("items", Routines.storeCallbackSpy, []);
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
				    toBeAnAction:function(util, customEqualityTesters){

				    	return {
						       compare:function(actual, expected){

							        if(!expected){
									   expected = true;
									}
							   
							        var result = {};
									
									result.pass = util.equals((actual.toString() == "[object RadixxAction]"), expected, customEqualityTesters);
				    
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
			
				   expect(action).toBeAnAction();
				
				   expect(action.createItem).toBeAFunction();
				
				   expect(store).toBeAStore();
				   
				   expect(store.getState).toBeAFunction();

				   expect(store.setChangeListener).toBeAFunction();

				   expect(store.unsetChangeListener).toBeAFunction();

				   expect(store.hydrate).toBeAFunction();

				   expect(store.swapCallback).toBeAFunction();

				   expect(store.undo).toBeAFunction();

				   expect(store.redo).toBeAFunction();
				
            });
			
			it("should trigger the store callback(s) when the action creator(s) are called", function(){
				  
				  action.createItem([]);

				  expect(Routines.storeCallbackSpy).toHaveBeenCalled();
				  
			});

			it("should trigger the store lsitener(s) when the action creator(s) are called", function(){
				
				  action.createItem([]);

				  expect(listener).toHaveBeenCalled();
				  
			});

			it("should throw an error if `undefined` is returned from the store callback", function(){

				  store.swapCallback(function(action, area){
				  		
				  		;
				  });

				  expect(function(){ 
				  
				        action.createItem({});
						
				  }).toThrowError("Radixx: Application State unavailable after signal to Dispatcher"); 
			});


});
    
