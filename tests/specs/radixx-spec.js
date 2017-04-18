/** 
 * @title: Unit Testing
 * @project: Radixx
 */


describe("Radixx: ", function() {
  
            var action;
            var store;
            var Routines;
  
			beforeEach(function() {
			
			    action = Radixx.createAction({'createItem':'CREATE_ITEM'});
			    Routines = {callback:function(action, area){ console && console.log("Action: " + action.actionType + "called!!"); return []; }};
				store = Radixx.createStore("items", Routines.callback, []);

				store.setChangeListener(function(){});
			  	
				
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
				 store = null;
				 action = null;
				 Routines = null;
			});
			
			it("should expose relevant objects and object APIs", function() {
			
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
			
			it("should trigger the store callback(s) when action creators are called", function(){
			
			      spyOn(Routines, "callback");
				  
				  action.createItem([]);

				  expect(Routines.callback).toHaveBeenCalled();
				  
			});

			it("should throw an error if new state object isn't returned from store callback", function(){

				  store.swapCallback(function(action, area){
				  		;
				  });

				  expect(function(){ 
				  
				        action.createItem({});
						
				  }).toThrowError("Radixx: Application State unavailable after signal to Dispatcher"); 
			});

});
    
