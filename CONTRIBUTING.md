# Code Requests

- define **Radixx.attachMiddleware(function: fn)**

```js

	// below is the form of the implementation

	Radixx.attachMiddleware(function(aciton, next){
		if(action.actionData === null){
			action.actionData = [{}];
		}
		return next();
	});
```

- modify **Radixx.createAction(object: obj)**

```js

	// below is the form of the implementation
	Radixx.createAction({
		// used to identify an action
		'doThing':{
				type:'DO_THING',
				// define what the payload for this action should be and look like
				payloadDefinition:[
					Radixx.Payload.typing.array.isRequired(),
					Radixx.Payload.form.object.asPart()
				]
		}	
	});
```

- Optimize <q>onDispatch</q> event not to fire only when any store data ACTUALLY changes

- See if there's a way to stop the propagation of _'storage'_ events whenever **Radixx** is making use of sessionStorage

- Detect memory leaks and clean them up.

- Build and Integrate support for GraphQL

- Add store config options