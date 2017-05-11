# Preamble

I'm very excited to see that you have decided (or planning to decide) to join in on this effort and contribute code and/or design proposition or bug fixes to the **Radixx** project. Welcome on board!   

# Code Requests

- define **Radixx.attachMiddleware(function: fn)** as part of _Radixx_ APIs as seen below:

```js

	// below is the form of the implementation

	Radixx.attachMiddleware(function(aciton, next){
		if(action.actionData === null){
			action.actionData = [{}];
		}
		return next();
	});
```

- modify **Radixx.createAction(object: obj)** to the form as seen below:

```js

	// below is the form of the implementation

	Radixx.createAction({
		// used to identify an action
		'doThing':{
				type:'DO_THING',
				// define what the payload for this action should be and look like
				payloadDefinition:[
					Radixx.Payload.type.array.isRequired(),
					Radixx.Payload.form.object.asPart()
				]
		}	
	});
```

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes

- See if there's a way to stop the propagation of _`storage`_ events whenever **Radixx** is making use of sessionStorage

- Detect places where memory leaks happen or are likely to happen in the codebase and clean them up.

- Build and Integrate support for GraphQL (if possible build in a small and efficient GraphQL client as part of Radixx)

- Add store config options to the Radixx instance

- Add _bower_ and _yarn_ package manager support