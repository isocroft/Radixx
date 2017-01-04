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
			    Routines = {callback:function(action, area){  }};
				store = Radixx.createStore("items", Routines.callback);
			  	
				
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
									     result.message = "It's a store object";
									}else{
									    result.message = "It's not a store object";
									}
									
									return result;
							}		
						}			
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
									     result.message = "It's an action object";
									}else{
									    result.message = "It's not an action object";
									}
									
									return result;
								}	
						}			
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
						  
					    }
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
				
            });
			
			it("should trigger the store callback when action creators are called", function(){
			
			      spyOn(Routines, "callback");
				  
				  action.createItem([]);

				  expect(Routines.callback).toHaveBeenCalled();
				  
			});

});
    
