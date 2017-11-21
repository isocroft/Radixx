# Preamble

I'm very excited to see that you have decided (or planning to decide) to join in on this effort and contribute code and/or design proposition or bug fixes to the **Radixx** project. Welcome on board! 

>Please feel free to modify existing code requests herein or suggest new code requests of your own (by adding them to this CONTRIBUTING.md file) and/or send in a pull request and open an issue (enhancement type) to thoroughly explain them. Thank You! 


## Code Requests

- define **Radixx.attachMiddleware(function: fn)** as part of _Radixx_ APIs as seen below: 

>In subsequent versions of **Radixx** (from the current version - v0.1.0), this middleware API will be for executing nuggets of logic whenever an action creator method is call (just before a store dispatch). The return value of the middleware callback function will be the return value for the action creator method when called (e.g. if the middleware callback function returns a promise - as is the case below). The middlware callback function can be used for sync/async tasks too. The general idea is to move all unavoidable async operations away from action creator methods and keep them (action creator methods) as "pure" as possible.

```js

	// below is the form of the implementation

	Radixx.attachMiddleware({

		actioner:function(acitonObj, next, flash){
		
				if(actionObj.actionType === 'STEP_UP'){
					actionObj.actionData = [{
						"something":actionObj.actionData;
					}];

					return next(
						null
					);
				}

				if(actionObj.actionType === 'PUSH_DOWN'){
					actionObj.actionData.isFetching = true;
					flash(actionObj); // an action flash lets us bypasses the internal (Undo/Redo) history of Radixx but triggers change listeners
				}
				
				let promise = new Promise((resolve, reject) => {
					setTimeout(() => {	
					 		var data = {};
					 		actionObj.actionData.isFetching = false;
					 		resolve(
					 			next(
					 				data
					 			)
					 		); // signal to Radixx that it should call the dispatcher

					}, 4500);
				});

				return promise;
		},

		logger:function(actionObj, next, data){

			 console.log("::", JSON.stringify(actionObj));

			 	next(
			 		data
			 	);

		},

		watcher:function(actionObj, next, data){

			next(
				data
			);
		}
	});


	let action = Radixx.createAction({
			'stepUp':{
				type:'STEP_UP',
				actionDefinition:[Radixx.Payload.type.object]
			}
	});
	
	action.stepUp({index:10}, 'openList').then((actionObj) => { 
		
		return action.doIt([
			actionObj
		]);

	}).then(() => {

	});

```

- define **Radixx.onError(function: fn)** as part of _Radixx_ APIs as seen below:

>As at the current version of **Radixx** (i.e. - v0.1.0). Whenever something goes wrong as a result of a type/syntax/range/reference error (mostly in the store callback or due to invalid action data type). Radixx always throw an error without trying to handle it. In subsequent versions, **Radixx** proposes to expose a error handler registration API to handle error conditions gracefully.

```js

	// below is the form of the implementation

	Radixx.onError(function(errorObject){
		
		switch(errorObject.name){
			case "TypeError":
			case "ReferenceError":
			case "RangeError":
				console.log("MyApp: ", errorObject.message, errorObject.stack);
			break;

			case "RadixxError":
				console.log("MyApp: [Radixx] ", errorObject.context, errorObject.message, errorObject.stack);
			break;
		}

	});
```

- Detect places where memory leaks happen or are likely to happen in the codebase and clean them up.

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes by taking a simple diff of the state object and trigger store callbacks conditionally (trigger only when store state data changes)

- Implement a way to enable store data accessible across windows/tabs by making it possible to propagate store change events and state across tabs using [localStorage] events

- See if there's a way to stop the propagation of _`storage`_ events whenever **Radixx** is making use of [sessionStorage] only

- Build and Integrate support for GraphQL (if possible build in a small and efficient GraphQL client as part of Radixx)

- Update store API routine/method signature for implementing undo/redo function specific to store.

- Add _bower_ and _yarn_ package manager support
