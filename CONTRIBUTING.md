# Preamble

I'm very excited to see that you have decided (or planning to decide) to join in on this effort and contribute code and/or design proposition or bug fixes to the **Radixx** project. Welcome on board! 

>Please feel free to modify existing code requests herein or suggest new code requests of your own (by adding them to this CONTRIBUTING.md file) and/or send in a pull request and open an issue (enhancement type) to thoroughly explain them. Thank You! 


## Code Requests

- define **Radixx.attachMiddleware(function: fn)** as part of _Radixx_ APIs as seen below: 

>In subsequent versions of **Radixx** (from the current version - v0.1.0), this middleware API will be for executing nuggets of logic whenever an action creator method is call (just before a store dispatch). The return value of the middleware callback function will be the return value for the action creator method when called (e.g. if the middleware callback function returns a promise - as is the case below). The middlware callback function can be used for sync/async tasks too. The general idea is to move all unavoidable async operations away from action creator methods and keep them (action creator methods) as "pure" as possible.

```js

	// below is the form of the implementation

	Radixx.attachMiddleware(function(acitonObj, next){
		
		if(actionObj.actionType === 'STEP_UP'){
			actionObj.actionData = [{
				"something":actionObj.actionData;
			}];
		}
		
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => {	
			 		
			 		next(resolve(actionObj)); // signal to Radixx that it should call the dispatcher

			}, 4500);
		});

		return promise;
	});

	let action = Radixx.createAction({
			'stepUp':{
				type:'STEP_UP',
				actionDefinition:[Radixx.Payload.type.object]
			}
	});
	
	action.stepUp({}, 'dormList').then(() => { 
		
		action.doIt([]);

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

- Update store API routine/method signature for implementing undo/redo function specific to store.

- Detect places where memory leaks happen or are likely to happen in the codebase and clean them up.

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes by taking a simple diff of the state object and trigger store callbacks conditionally (trigger only when store state data changes)

- Implement a way to enable store data accessible across windows/tabs by making it possible to propagate store change events and state across tabs using [localStorage] events

- See if there's a way to stop the propagation of _`storage`_ events whenever **Radixx** is making use of [sessionStorage] only

- Build and Integrate support for GraphQL (if possible build in a small and efficient GraphQL client as part of Radixx)

- Add _bower_ and _yarn_ package manager support